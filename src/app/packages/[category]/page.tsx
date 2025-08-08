"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

function getRatingLabel(rating: number) {
  if (rating >= 4.7) return "Excellent";
  if (rating >= 4.5) return "Great";
  if (rating >= 4.0) return "Good";
  return "Average";
}

const PackagesPage = () => {
  const params = useParams();
  const category = params.category as string;

  // Package data for each category
  const packageData = {
    trending: [
      {
        title: "Royal Rajasthan",
        duration: "5N-6D",
        location: "Rajasthan, India",
        price: "₹70,000",
        originalPrice: "₹76,500",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Trending",
        description: "Experience the grandeur of royal palaces and desert landscapes",
        booked: 1200,
        slug: "royal-rajasthan"
      },
      {
        title: "Swiss Alps Adventure",
        duration: "7N-8D",
        location: "Switzerland",
        price: "₹1,25,000",
        originalPrice: "₹1,40,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Popular",
        description: "Mountain adventures and scenic train journeys",
        booked: 950,
        slug: "swiss-alps-adventure"
      },
      {
        title: "Bali Paradise",
        duration: "6N-7D",
        location: "Bali, Indonesia",
        price: "₹85,000",
        originalPrice: "₹95,000",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Best Seller",
        description: "Tropical beaches and cultural experiences",
        booked: 1700,
        slug: "bali-paradise"
      },
      {
        title: "Dubai Luxury",
        duration: "5N-6D",
        location: "Dubai, UAE",
        price: "₹95,000",
        originalPrice: "₹1,10,000",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Luxury",
        description: "Modern city with desert adventures and shopping",
        booked: 1100,
        slug: "dubai-luxury"
      },
      {
        title: "Singapore Explorer",
        duration: "4N-5D",
        location: "Singapore",
        price: "₹65,000",
        originalPrice: "₹75,000",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "City Break",
        description: "Urban exploration with cultural experiences",
        booked: 800,
        slug: "singapore-explorer"
      },
      {
        title: "Thailand Discovery",
        duration: "6N-7D",
        location: "Thailand",
        price: "₹55,000",
        originalPrice: "₹65,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Cultural",
        description: "Temples, beaches, and authentic Thai culture",
        booked: 1400,
        slug: "thailand-discovery"
      }
    ],
    holidays: [
      {
        title: "Maldives Beach Escape",
        duration: "7N-8D",
        location: "Maldives",
        price: "₹1,20,000",
        originalPrice: "₹1,40,000",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Beach",
        description: "Overwater villas and pristine beaches",
        booked: 950,
        slug: "maldives-beach-escape"
      },
      {
        title: "Himalayan Trek",
        duration: "8N-9D",
        location: "Nepal",
        price: "₹45,000",
        originalPrice: "₹55,000",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Mountain",
        description: "Adventure trekking in the Himalayas",
        booked: 650,
        slug: "himalayan-trek"
      },
      {
        title: "Paris City Break",
        duration: "5N-6D",
        location: "Paris, France",
        price: "₹85,000",
        originalPrice: "₹95,000",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "City",
        description: "Romantic city with iconic landmarks",
        booked: 1200,
        slug: "paris-city-break"
      },
      {
        title: "African Safari",
        duration: "10N-11D",
        location: "Kenya",
        price: "₹1,50,000",
        originalPrice: "₹1,70,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Wildlife",
        description: "Wildlife safari in the African savanna",
        booked: 450,
        slug: "african-safari"
      },
      {
        title: "Greek Islands",
        duration: "8N-9D",
        location: "Greece",
        price: "₹95,000",
        originalPrice: "₹1,10,000",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Island",
        description: "Ancient ruins and Mediterranean charm",
        booked: 750,
        slug: "greek-islands"
      },
      {
        title: "Japanese Culture",
        duration: "7N-8D",
        location: "Japan",
        price: "₹1,05,000",
        originalPrice: "₹1,20,000",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Cultural",
        description: "Traditional temples and modern cities",
        booked: 850,
        slug: "japanese-culture"
      }
    ],
    popular: [
      {
        title: "Europe Grand Tour",
        duration: "12N-13D",
        location: "Europe",
        price: "₹1,25,000",
        originalPrice: "₹1,40,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Popular",
        description: "Multi-country European adventure",
        booked: 3500,
        slug: "europe-grand-tour"
      },
      {
        title: "Singapore & Malaysia",
        duration: "8N-9D",
        location: "Singapore & Malaysia",
        price: "₹75,000",
        originalPrice: "₹85,000",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Trending",
        description: "Modern cities and tropical rainforests",
        booked: 2800,
        slug: "singapore-malaysia"
      },
      {
        title: "Thailand Explorer",
        duration: "9N-10D",
        location: "Thailand",
        price: "₹65,000",
        originalPrice: "₹75,000",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Best Seller",
        description: "Complete Thai experience from north to south",
        booked: 4200,
        slug: "thailand-explorer"
      },
      {
        title: "Dubai & Abu Dhabi",
        duration: "6N-7D",
        location: "UAE",
        price: "₹95,000",
        originalPrice: "₹1,10,000",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Luxury",
        description: "Luxury shopping and desert adventures",
        booked: 2100,
        slug: "dubai-abu-dhabi"
      },
      {
        title: "Vietnam Discovery",
        duration: "10N-11D",
        location: "Vietnam",
        price: "₹55,000",
        originalPrice: "₹65,000",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Adventure",
        description: "From Hanoi to Ho Chi Minh City",
        booked: 1800,
        slug: "vietnam-discovery"
      },
      {
        title: "Nepal Adventure",
        duration: "11N-12D",
        location: "Nepal",
        price: "₹45,000",
        originalPrice: "₹55,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Adventure",
        description: "Himalayan trekking and cultural experiences",
        booked: 1500,
        slug: "nepal-adventure"
      }
    ],
    premium: [
      {
        title: "Luxury Maldives Escape",
        duration: "7N-8D",
        location: "Maldives",
        price: "₹2,50,000",
        originalPrice: "₹3,00,000",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Premium",
        description: "Overwater villas, private beaches, and world-class spa experiences",
        booked: 850,
        slug: "luxury-maldives-escape"
      },
      {
        title: "Swiss Alps Luxury",
        duration: "8N-9D",
        location: "Switzerland",
        price: "₹3,20,000",
        originalPrice: "₹3,80,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Exclusive",
        description: "Luxury mountain resorts with panoramic views and gourmet dining",
        booked: 650,
        slug: "swiss-alps-luxury"
      },
      {
        title: "Dubai Royal Experience",
        duration: "6N-7D",
        location: "Dubai, UAE",
        price: "₹1,80,000",
        originalPrice: "₹2,20,000",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Luxury",
        description: "Burj Al Arab stay, desert safari, and exclusive city tours",
        booked: 1200,
        slug: "dubai-royal-experience"
      },
      {
        title: "Santorini Elite",
        duration: "6N-7D",
        location: "Greece",
        price: "₹2,20,000",
        originalPrice: "₹2,60,000",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Premium",
        description: "Private villa with infinity pool and sunset views",
        booked: 450,
        slug: "santorini-elite"
      },
      {
        title: "Bora Bora Paradise",
        duration: "8N-9D",
        location: "French Polynesia",
        price: "₹4,50,000",
        originalPrice: "₹5,20,000",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Ultra Premium",
        description: "Overwater bungalows in crystal clear waters",
        booked: 250,
        slug: "bora-bora-paradise"
      },
      {
        title: "Swiss Luxury Train",
        duration: "9N-10D",
        location: "Switzerland",
        price: "₹3,80,000",
        originalPrice: "₹4,20,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Exclusive",
        description: "Glacier Express and luxury mountain resorts",
        booked: 350,
        slug: "swiss-luxury-train"
      }
    ],
    adventure: [
      {
        title: "Himalayan Trekking",
        duration: "10N-11D",
        location: "Nepal Himalayas",
        price: "₹45,000",
        originalPrice: "₹55,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Adventure",
        description: "Conquer the mighty Himalayas with expert guides and breathtaking mountain views",
        booked: 1200,
        slug: "himalayan-trekking"
      },
      {
        title: "Amazon Jungle Safari",
        duration: "8N-9D",
        location: "Brazil",
        price: "₹85,000",
        originalPrice: "₹1,00,000",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Wildlife",
        description: "Explore the world's largest rainforest with wildlife encounters and river adventures",
        booked: 850,
        slug: "amazon-jungle-safari"
      },
      {
        title: "Patagonia Expedition",
        duration: "12N-13D",
        location: "Argentina & Chile",
        price: "₹1,25,000",
        originalPrice: "₹1,45,000",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Expedition",
        description: "Trek through the stunning landscapes of Patagonia with glaciers and fjords",
        booked: 650,
        slug: "patagonia-expedition"
      },
      {
        title: "African Safari Adventure",
        duration: "14N-15D",
        location: "Tanzania & Kenya",
        price: "₹1,80,000",
        originalPrice: "₹2,10,000",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Wildlife",
        description: "Big Five safari with camping and luxury lodges",
        booked: 450,
        slug: "african-safari-adventure"
      },
      {
        title: "Alaska Wilderness",
        duration: "10N-11D",
        location: "Alaska, USA",
        price: "₹1,50,000",
        originalPrice: "₹1,75,000",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Wilderness",
        description: "Glacier hiking, wildlife viewing, and northern lights",
        booked: 350,
        slug: "alaska-wilderness"
      },
      {
        title: "New Zealand Adventure",
        duration: "15N-16D",
        location: "New Zealand",
        price: "₹2,20,000",
        originalPrice: "₹2,50,000",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Multi-Sport",
        description: "Bungee jumping, hiking, and adventure sports",
        booked: 550,
        slug: "new-zealand-adventure"
      }
    ]
  };

  const categoryTitles = {
    trending: "All Trending Packages",
    holidays: "All Holiday Packages",
    popular: "All Popular Destinations",
    premium: "All Premium Packages",
    adventure: "All Adventure Packages"
  };

  const categoryDescriptions = {
    trending: "Discover our most popular travel packages, carefully curated for unforgettable experiences",
    holidays: "From beach getaways to mountain adventures, find the perfect holiday type that matches your travel style",
    popular: "Explore our most sought-after destinations that travelers love to visit",
    premium: "Indulge in luxury travel experiences with our handpicked premium packages featuring exclusive accommodations",
    adventure: "Push your limits with our adrenaline-pumping adventure packages designed for thrill-seekers"
  };

  const packages = packageData[category as keyof typeof packageData] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo at top left */}
            <div className="flex items-center space-x-6">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/logo.png"
                    alt="Paradise Yatra Logo"
                    width={50}
                    height={50}
                    className="rounded-lg "
                  />
                </div>
              </Link>
              {/* Trust Badges */}
              <div className="ml-70 hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="font-medium">Best Deals</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🔒</span>
                  </div>
                  <span className="font-medium">Best Services</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">⭐</span>
                  </div>
                  <span className="font-medium">4.8/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🏆</span>
                  </div>
                  <span className="font-medium">Award Winner</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            {categoryTitles[category as keyof typeof categoryTitles]}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto font-nunito font-light"
          >
            {categoryDescriptions[category as keyof typeof categoryDescriptions]}
          </motion.p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="h-full flex"
            >
              <Card className="group overflow-hidden modern-card hover-lift rounded-3xl shadow-xl border-0 relative bg-gradient-to-br from-white via-blue-50 to-blue-100 h-full flex flex-col min-h-[540px]">
                <div className="relative h-60 overflow-hidden card-image rounded-t-3xl">
                  <Image 
                    src={pkg.image} 
                    alt={pkg.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  {/* Floating View Details Button */}
                  <Link href={`/itinerary/${pkg.slug}`}>
                    <Button 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/20 backdrop-blur-lg text-black px-4 py-1 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-white/20 text-xs"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </Link>
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="badge bg-blue-600 text-white px-3 py-1 text-xs font-bold shadow-md">
                      {pkg.badge}
                    </Badge>
                  </div>
                  {/* Social Proof */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-30">
                    {/* Rating */}
                    <div
                      className="bg-white/95 rounded-full w-11 h-11 flex items-center justify-center shadow-lg border-2 border-yellow-300 mb-1"
                      tabIndex={0}
                      aria-label={`Rated ${pkg.rating} out of 5: ${getRatingLabel(Number(pkg.rating))}`}
                      title={`Rated ${pkg.rating} out of 5: ${getRatingLabel(Number(pkg.rating))}`}
                    >
                      <span className="flex items-center gap-0.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-0.5" aria-hidden="true" />
                        <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
                      </span>
                    </div>
                    {/* Booked badge */}
                    <div className="bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 shadow-md">
                      <span role="img" aria-label="traveler">🌏</span> Booked {pkg.booked}+ times
                    </div>
                  </div>
                </div>
                <CardContent className="p-7 card-content flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className="!text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">
                      {pkg.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{pkg.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-extrabold text-blue-700">{pkg.price}</div>
                      <div className="line-through text-gray-400 text-sm">{pkg.originalPrice}</div>
                      <div className="text-xs text-gray-500 mt-1">Starting From Per Person</div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm animate-pulse">
                        <span role="img" aria-label="savings">💸</span>
                        Save ₹{(parseInt(pkg.originalPrice.replace('₹', '').replace(',', '')) - parseInt(pkg.price.replace('₹', '').replace(',', ''))).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link href={`/itinerary/${pkg.slug}`}>
                      <Button className="book-button w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-blue-300">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Back to Home Button with improved spacing */}
        <div className="flex justify-center mt-20 mb-16">
          <Link href="/">
            <Button className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-200">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer spacing */}
      <div className="h-20 bg-gradient-to-t from-blue-50 to-transparent"></div>
    </div>
  );
};

export default PackagesPage; 