import { useState, useEffect } from 'react';

interface NavigationItem {
  name: string;
  icon: unknown;
  submenu: Array<{
    name: string;
    href: string;
    featured?: boolean;
  }>;
}

interface Package {
  _id: string;
  title: string;
  slug: string;
  category: string;
  destination: string;
  isFeatured?: boolean; // Added isFeatured to Package interface
}



// Fallback navigation items
const fallbackNavItems: NavigationItem[] = [
  {
    name: "Premium Packages",
    icon: "Globe",
    submenu: [
      { name: "Europe Packages", href: "/packages/premium" },
      { name: "Southeast Asia", href: "/packages/premium" },
      { name: "Middle East", href: "/packages/premium" },
    ],
  },
  {
    name: "Adventure Escapes",
    icon: "MapPin",
    submenu: [
      { name: "Himalayan Getaways", href: "/packages/adventure" },
      { name: "Beach Vacations", href: "/packages/adventure" },
      { name: "Cultural Tours", href: "/packages/adventure" },
    ],
  },
  {
    name: "Trending Destinations",
    icon: "Star",
    submenu: [
      { name: "Popular Cities", href: "/packages/trending" },
      { name: "Hot Destinations", href: "/packages/trending" },
      { name: "Featured Tours", href: "/packages/trending" },
    ],
  },
];

// Category configuration
const categoryConfig = {
  premium: {
    name: "Premium Packages",
    icon: "Globe",
    href: "/itinerary/"
  },
  adventure: {
    name: "Adventure Escapes", 
    icon: "MapPin",
    href: "/itinerary/"
  },
  holiday: {
    name: "Holiday Packages",
    icon: "Calendar", 
    href: "/itinerary/"
  },
  trending: {
    name: "Trending Destinations",
    icon: "Star",
    href: "/itinerary/"
  },
  popular: {
    name: "Popular Destinations",
    icon: "Heart",
    href: "/itinerary/"
  }
};

export const useNavigation = () => {
  const [navItems, setNavItems] = useState<NavigationItem[]>(fallbackNavItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch packages and holiday types in parallel
        const [packagesResponse, holidayTypesResponse] = await Promise.all([
          fetch('/api/packages'),
          fetch('/api/holiday-types')
        ]);

        if (!packagesResponse.ok || !holidayTypesResponse.ok) {
          throw new Error('Failed to fetch navigation data');
        }

        const packagesData = await packagesResponse.json();

        // Group packages by category
        const packagesByCategory = packagesData.packages?.reduce((acc: Record<string, Package[]>, pkg: Package) => {
          if (!acc[pkg.category]) {
            acc[pkg.category] = [];
          }
          acc[pkg.category].push(pkg);
          return acc;
        }, {}) || {};

        // Create navigation items dynamically
        const dynamicNavItems: NavigationItem[] = [];

        // Create navigation items for each category that has packages (limit to 3)
        let itemCount = 0;
        Object.keys(categoryConfig).forEach(category => {
          if (itemCount >= 3) return; // Limit to 3 navigation items
          if (packagesByCategory[category] && packagesByCategory[category].length > 0) {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            dynamicNavItems.push({
              name: config.name,
              icon: config.icon,
              submenu: packagesByCategory[category].slice(0, 3).map((pkg: Package) => ({
                name: pkg.title,
                href: `${config.href}${pkg.slug}`,
                featured: pkg.isFeatured || false
              }))
            });
            itemCount++;
          }
        });

        // If we have dynamic data, use it; otherwise keep fallback
        if (dynamicNavItems.length > 0) {
          setNavItems(dynamicNavItems);
        } else {
          setNavItems(fallbackNavItems);
        }
      } catch (err) {
        console.error('Error fetching navigation data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch navigation data');
        // Keep fallback navigation items on error
        setNavItems(fallbackNavItems);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationData();
  }, []);

  return { navItems, loading, error };
};
