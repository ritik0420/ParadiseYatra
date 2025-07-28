import { Card, CardContent } from "@/components/ui/card";

const HolidaysSection = () => {
  const categories = [
    {
      title: "Beach Holidays",
      description: "Discover amazing places, experiences, and offers curated just for you. Stay tuned for more updates and stories.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      title: "Mountain Treks",
      description: "Adventure awaits in the mountains with guided treks and camping experiences.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      title: "City Breaks",
      description: "Explore vibrant cities and urban destinations with cultural experiences.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      title: "Wildlife Tours",
      description: "Get close to nature with exciting wildlife safaris and nature reserves.",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-gradient-to-br from-orange-400 to-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Holidays for every</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover amazing places, experiences, and offers curated just for you. Stay tuned for more updates and stories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 relative">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="mt-5 !text-xl font-semibold mb-3 text-gray-800">{category.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HolidaysSection;