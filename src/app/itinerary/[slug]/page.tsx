"use client";

import { motion } from "framer-motion";
import { ChevronRight, CheckCircle, Loader2, Clock, MapPin, Star, Users, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, use, useEffect } from "react";
import { DayItineraryCard, InclusionList, PackageHeader } from "@/components/itinerary";
import { useRouter } from "next/navigation";
import { OptimizedImage } from "@/components/ui/optimized-image";
import LeadCaptureForm from "@/components/LeadCaptureForm";

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
  accommodation: string;
  meals: string;
  image: string;
}

interface Package {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount: number;
  duration: string;
  destination: string;
  category: string;
  images: string[];
  highlights: string[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  rating: number;
  reviews: any[];
  isActive: boolean;
  isFeatured: boolean;
}

const ItineraryPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([0, 1]);
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const router = useRouter();
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/packages/slug/${resolvedParams.slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Package not found');
            return;
          }
          throw new Error('Failed to fetch package');
        }
        
        const data = await response.json();
        
        // Ensure we have at least one image for the package
        if (!data.images || data.images.length === 0) {
          // Try to get image from itinerary
          if (data.itinerary && data.itinerary.length > 0) {
            const firstItineraryWithImage = data.itinerary.find((day: any) => day.image);
            if (firstItineraryWithImage) {
              data.images = [firstItineraryWithImage.image];
              console.log('Using itinerary image as cover:', firstItineraryWithImage.image);
            } else {
              // Set a default travel image if no images are available
              data.images = ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"];
              console.log('Using default travel image as cover');
            }
          } else {
            // Set a default travel image if no images are available
            data.images = ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"];
            console.log('Using default travel image as cover');
          }
        }
        
        setPackageData(data);
        
        // Debug logging
        console.log('Package data received:', data);
        console.log('Package images:', data.images);
        console.log('First image URL:', data.images && data.images.length > 0 ? data.images[0] : 'No images');
        
      } catch (error) {
        console.error('Error fetching package:', error);
        setError('Failed to load package details');
      } finally {
        setIsLoading(false);
      }
    };

    if (resolvedParams.slug) {
      fetchPackage();
    }
  }, [resolvedParams.slug]);

  const toggleDay = (dayIndex: number) => {
    setExpandedDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 text-lg">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <CheckCircle className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Package Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The package you are looking for does not exist.'}</p>
          <Button 
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Calculate discount percentage if not provided or is 0
  const getDiscount = () => {
    if (
      packageData.originalPrice &&
      packageData.originalPrice > packageData.price
    ) {
      return Math.round(
        ((packageData.originalPrice - packageData.price) / packageData.originalPrice) * 100
      );
    }
    return packageData.discount || 0;
  };

  const discount = getDiscount();

  const calculateDiscountedPrice = () => {
    if (discount > 0) {
      return packageData.price;
    }
    return packageData.price;
  };

  const discountedPrice = calculateDiscountedPrice();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600 transition-colors font-medium">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/packages" className="hover:text-blue-600 transition-colors font-medium">Packages</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">{packageData.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <PackageHeader 
        title={packageData.title}
        subtitle={packageData.shortDescription}
        duration={packageData.duration}
        location={packageData.destination}
        rating={packageData.rating.toString()}
        totalBookings={packageData.reviews.length}
        coverImage={packageData.images && packageData.images.length > 0 ? packageData.images[0] : ""}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Package Overview */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-12 mt-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Package Overview</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {packageData.description}
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Highlights Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 h-fit">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 text-blue-600 mr-2" />
                    Highlights
                  </h3>
                  <ul className="space-y-3">
                    {packageData.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start group">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-700 text-lg">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Info Section */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 text-amber-500 mr-2" />
                    Quick Info
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        Duration:
                      </span>
                      <span className="font-semibold text-gray-900">{packageData.duration || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        Location:
                      </span>
                      <span className="font-semibold text-gray-900">{packageData.destination || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-gray-500" />
                        Category:
                      </span>
                      <span className="font-semibold text-gray-900 capitalize">{packageData.category || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-amber-500" />
                        Rating:
                      </span>
                      <span className="font-semibold text-gray-900">{packageData.rating ? `${packageData.rating}/5` : 'Not rated'}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-500" />
                        Reviews:
                      </span>
                      <span className="font-semibold text-gray-900">{packageData.reviews?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        Type:
                      </span>
                      <span className="font-semibold text-gray-900 capitalize">{packageData.isFeatured ? 'Featured' : 'Standard'}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-gray-500" />
                        Status:
                      </span>
                      <Badge className={`${packageData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {packageData.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Day-wise Itinerary */}
            {packageData.itinerary && packageData.itinerary.length > 0 ? (
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Detailed Itinerary</h2>
                {packageData.itinerary.map((day: DayItinerary, index: number) => (
                <DayItineraryCard
                  key={index}
                  day={day}
                  isExpanded={expandedDays.includes(index)}
                  onToggle={() => toggleDay(index)}
                />
              ))}
            </motion.section>
            ) : (
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Itinerary</h2>
                  <p className="text-lg text-gray-600">Detailed itinerary for this package is being prepared.</p>
                </div>
              </motion.section>
            )}
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
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-400 to-indigo-700 text-white mb-8 mt-12">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-white">Package Price</h3>
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{formatPrice(discountedPrice)}</span>
                      {packageData.originalPrice && (
                        <span className="text-xl text-blue-200 line-through ml-3">{formatPrice(packageData.originalPrice)}</span>
                      )}
                    </div>
                    {discount > 0 && (
                    <Badge className="bg-yellow-400 text-yellow-900 mt-3 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                        Save {discount}%
                    </Badge>
                    )}
                  </div>
                  <Button 
                    onClick={() => setIsLeadFormOpen(true)}
                    className="w-full text-blue-600 hover:bg-gray-100 py-4 text-lg font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full mt-3 border-white/30 text-white hover:bg-white/10 py-3 text-base font-semibold rounded-xl">
                    Customize Package
                  </Button>
                  <p className="text-sm text-white mt-4 text-center">
                    Per person on twin sharing basis
                  </p>
                </CardContent>
              </Card>

              {/* Inclusions & Exclusions */}
              <div className="space-y-8">
                {packageData.inclusions && packageData.inclusions.length > 0 && (
                <InclusionList 
                  title="What's Included" 
                    items={packageData.inclusions} 
                  type="inclusions" 
                />
                )}
                {packageData.exclusions && packageData.exclusions.length > 0 && (
                <InclusionList 
                  title="What's Not Included" 
                    items={packageData.exclusions} 
                  type="exclusions" 
                />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form */}
      <LeadCaptureForm
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
        packageTitle={packageData?.title}
        packagePrice={packageData ? formatPrice(discountedPrice) : undefined}
      />
    </motion.div>
  );
};

export default ItineraryPage; 