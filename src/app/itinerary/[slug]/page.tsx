"use client";

import { motion } from "framer-motion";
import { ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, use } from "react";
import { DayItineraryCard, InclusionList, PackageHeader } from "@/components/itinerary";

// Sample data for different packages - in real app this would come from API
const packageData = {
  "royal-rajasthan": {
    title: "Royal Rajasthan Adventure",
    subtitle: "Experience the grandeur of royal palaces and desert landscapes",
    duration: "6 Days / 5 Nights",
    location: "Rajasthan, India",
    price: "₹70,000",
    originalPrice: "₹76,500",
    rating: "4.9",
    totalBookings: 1200,
    coverImage: "https://res.cloudinary.com/youcations/image/upload/q_auto,f_auto/packages_prod/ckhd4ozxj1xr0l7p0aqw.jpg",
    highlights: [
      "Visit the iconic Amber Fort in Jaipur",
      "Experience a sunset camel safari in Thar Desert",
      "Explore the romantic Lake Palace in Udaipur",
      "Witness the grandeur of Mehrangarh Fort",
      "Enjoy traditional Rajasthani folk dance",
      "Stay in heritage hotels and palaces"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jaipur - The Pink City",
        activities: [
          "Arrive at Jaipur International Airport",
          "Transfer to your heritage hotel",
          "Welcome traditional Rajasthani dinner",
          "Evening at leisure to explore local markets"
        ],
        accommodation: "Heritage Palace Hotel, Jaipur",
        meals: "Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 2,
        title: "Jaipur City Tour",
        activities: [
          "Visit the magnificent Amber Fort",
          "Explore City Palace and Hawa Mahal",
          "Jantar Mantar Observatory tour",
          "Evening shopping at Johari Bazaar"
        ],
        accommodation: "Heritage Palace Hotel, Jaipur",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 3,
        title: "Jaipur to Jodhpur - The Blue City",
        activities: [
          "Morning drive to Jodhpur (5 hours)",
          "Visit Mehrangarh Fort",
          "Explore Jaswant Thada",
          "Sunset view from Clock Tower"
        ],
        accommodation: "Heritage Hotel, Jodhpur",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 4,
        title: "Jodhpur to Jaisalmer - Golden City",
        activities: [
          "Drive to Jaisalmer (5 hours)",
          "Visit Jaisalmer Fort",
          "Patwon Ki Haveli tour",
          "Evening camel safari in Thar Desert"
        ],
        accommodation: "Desert Camp, Jaisalmer",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 5,
        title: "Jaisalmer Desert Experience",
        activities: [
          "Morning desert safari",
          "Visit Sam Sand Dunes",
          "Traditional folk dance performance",
          "Overnight stay in luxury desert camp"
        ],
        accommodation: "Luxury Desert Camp, Jaisalmer",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 6,
        title: "Departure",
        activities: [
          "Morning at leisure",
          "Transfer to Jaisalmer Airport",
          "Flight back to your home city",
          "End of memorable Rajasthan journey"
        ],
        accommodation: "N/A",
        meals: "Breakfast",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    inclusions: [
      "All airport transfers and transportation",
      "Accommodation in heritage hotels and desert camp",
      "Daily breakfast, lunch, and dinner",
      "Professional English-speaking guide",
      "All monument entrance fees",
      "Camel safari in Thar Desert",
      "Traditional folk dance performance",
      "All applicable taxes"
    ],
    exclusions: [
      "International and domestic flights",
      "Personal expenses and tips",
      "Travel insurance",
      "Optional activities not mentioned",
      "Alcoholic beverages",
      "Any expenses due to natural calamities"
    ]
  },
  "swiss-alps-adventure": {
    title: "Swiss Alps Adventure",
    subtitle: "Mountain adventures and scenic train journeys",
    duration: "7 Days / 8 Nights",
    location: "Switzerland",
    price: "₹1,25,000",
    originalPrice: "₹1,40,000",
    rating: "4.8",
    totalBookings: 950,
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Scenic train journey on Glacier Express",
      "Explore the charming city of Zermatt",
      "Visit the iconic Matterhorn",
      "Experience Interlaken's adventure activities",
      "Lucerne's medieval architecture",
      "Swiss chocolate and cheese tasting"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Zurich",
        activities: [
          "Arrive at Zurich Airport",
          "Transfer to hotel in Zurich",
          "Welcome dinner at traditional Swiss restaurant",
          "Evening walk around Old Town"
        ],
        accommodation: "Hotel in Zurich",
        meals: "Dinner",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 2,
        title: "Zurich to Zermatt",
        activities: [
          "Morning train to Zermatt",
          "Check into mountain hotel",
          "Explore car-free village",
          "Evening at leisure"
        ],
        accommodation: "Mountain Hotel, Zermatt",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 3,
        title: "Matterhorn Experience",
        activities: [
          "Cable car to Matterhorn Glacier Paradise",
          "Visit Klein Matterhorn",
          "Mountain hiking trails",
          "Sunset views of Matterhorn"
        ],
        accommodation: "Mountain Hotel, Zermatt",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 4,
        title: "Glacier Express to Interlaken",
        activities: [
          "Scenic train journey on Glacier Express",
          "Arrive in Interlaken",
          "Explore Interlaken town",
          "Optional adventure activities"
        ],
        accommodation: "Hotel in Interlaken",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 5,
        title: "Interlaken Adventures",
        activities: [
          "Visit Jungfraujoch - Top of Europe",
          "Adventure activities (paragliding/skydiving)",
          "Lake Thun and Lake Brienz cruise",
          "Evening at leisure"
        ],
        accommodation: "Hotel in Interlaken",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 6,
        title: "Interlaken to Lucerne",
        activities: [
          "Train to Lucerne",
          "Explore Old Town and Chapel Bridge",
          "Swiss Transport Museum",
          "Evening boat cruise on Lake Lucerne"
        ],
        accommodation: "Hotel in Lucerne",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 7,
        title: "Lucerne and Departure",
        activities: [
          "Morning at leisure in Lucerne",
          "Swiss chocolate and cheese tasting",
          "Transfer to Zurich Airport",
          "Flight back home"
        ],
        accommodation: "N/A",
        meals: "Breakfast",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    inclusions: [
      "All train transfers and transportation",
      "Accommodation in 4-star hotels",
      "Daily breakfast, lunch, and dinner",
      "Professional English-speaking guide",
      "All cable car and mountain train tickets",
      "Swiss Travel Pass",
      "Adventure activities in Interlaken",
      "All applicable taxes"
    ],
    exclusions: [
      "International flights",
      "Personal expenses and tips",
      "Travel insurance",
      "Optional activities not mentioned",
      "Alcoholic beverages",
      "Any expenses due to weather conditions"
    ]
  },
  "bali-paradise": {
    title: "Bali Paradise",
    subtitle: "Tropical beaches and cultural experiences",
    duration: "6 Days / 7 Nights",
    location: "Bali, Indonesia",
    price: "₹85,000",
    originalPrice: "₹95,000",
    rating: "4.7",
    totalBookings: 1700,
    coverImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Visit ancient temples and rice terraces",
      "Relax on pristine beaches",
      "Experience traditional Balinese dance",
      "Explore Ubud's cultural heart",
      "Water sports and adventure activities",
      "Luxury spa and wellness treatments"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        activities: [
          "Arrive at Ngurah Rai International Airport",
          "Transfer to hotel in Seminyak",
          "Welcome dinner at beachfront restaurant",
          "Evening at leisure"
        ],
        accommodation: "Luxury Hotel, Seminyak",
        meals: "Dinner",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 2,
        title: "Seminyak Beach Day",
        activities: [
          "Morning beach activities",
          "Water sports (surfing, snorkeling)",
          "Visit Tanah Lot Temple",
          "Sunset at Seminyak Beach"
        ],
        accommodation: "Luxury Hotel, Seminyak",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 3,
        title: "Ubud Cultural Tour",
        activities: [
          "Visit Sacred Monkey Forest",
          "Explore Tegalalang Rice Terraces",
          "Traditional Balinese dance performance",
          "Ubud Palace and Saraswati Temple"
        ],
        accommodation: "Boutique Hotel, Ubud",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 4,
        title: "Ubud Adventures",
        activities: [
          "Mount Batur sunrise trek",
          "Visit Tirta Empul Temple",
          "Traditional cooking class",
          "Evening spa treatment"
        ],
        accommodation: "Boutique Hotel, Ubud",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 5,
        title: "Nusa Penida Island",
        activities: [
          "Speedboat to Nusa Penida",
          "Visit Kelingking Beach",
          "Angel's Billabong and Broken Beach",
          "Return to mainland"
        ],
        accommodation: "Luxury Hotel, Seminyak",
        meals: "Breakfast, Lunch, Dinner",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        day: 6,
        title: "Departure",
        activities: [
          "Morning at leisure",
          "Last-minute shopping",
          "Transfer to airport",
          "Flight back home"
        ],
        accommodation: "N/A",
        meals: "Breakfast",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    inclusions: [
      "All airport transfers and transportation",
      "Accommodation in luxury hotels",
      "Daily breakfast, lunch, and dinner",
      "Professional English-speaking guide",
      "All temple and attraction entrance fees",
      "Water sports activities",
      "Traditional dance performance",
      "Spa treatment session",
      "All applicable taxes"
    ],
    exclusions: [
      "International flights",
      "Personal expenses and tips",
      "Travel insurance",
      "Optional activities not mentioned",
      "Alcoholic beverages",
      "Any expenses due to natural calamities"
    ]
  }
};



const ItineraryPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([0, 1]);
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  
  // Get package data based on slug, fallback to royal-rajasthan if not found
  const itineraryData = packageData[resolvedParams.slug as keyof typeof packageData] || packageData["royal-rajasthan"];

  const toggleDay = (dayIndex: number) => {
    setExpandedDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/destinations" className="hover:text-blue-600 transition-colors">Destinations</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{itineraryData.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <PackageHeader 
        title={itineraryData.title}
        subtitle={itineraryData.subtitle}
        duration={itineraryData.duration}
        location={itineraryData.location}
        rating={itineraryData.rating}
        totalBookings={itineraryData.totalBookings}
        coverImage={itineraryData.coverImage}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Package Overview */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg p-6 shadow-sm border mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Overview</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Embark on an unforgettable journey that combines adventure, culture, and luxury. This carefully curated package offers the perfect balance of exploration and relaxation, ensuring you experience the best of what this destination has to offer.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h3>
                  <ul className="space-y-2">
                    {itineraryData.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{itineraryData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{itineraryData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">{itineraryData.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Bookings:</span>
                      <span className="font-medium">{itineraryData.totalBookings}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Day-wise Itinerary */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
              {itineraryData.itinerary.map((day: any, index: number) => (
                <DayItineraryCard
                  key={index}
                  day={day}
                  isExpanded={expandedDays.includes(index)}
                  onToggle={() => toggleDay(index)}
                />
              ))}
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Pricing Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sticky top-8"
            >
              <Card className="modern-card mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Package Price</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-blue-600">{itineraryData.price}</span>
                      <span className="text-lg text-gray-500 line-through ml-2">{itineraryData.originalPrice}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      Save ₹{parseInt(itineraryData.originalPrice.replace(/[^\d]/g, '')) - parseInt(itineraryData.price.replace(/[^\d]/g, ''))}
                    </Badge>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                    Book Now
                  </Button>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Per person on twin sharing basis
                  </p>
                </CardContent>
              </Card>

              {/* Inclusions & Exclusions */}
              <div className="space-y-6">
                <InclusionList 
                  title="What's Included" 
                  items={itineraryData.inclusions} 
                  type="inclusions" 
                />
                <InclusionList 
                  title="What's Not Included" 
                  items={itineraryData.exclusions} 
                  type="exclusions" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItineraryPage; 