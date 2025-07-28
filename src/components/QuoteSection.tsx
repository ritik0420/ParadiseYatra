const QuoteSection = () => {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-400 to-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">✈️</div>
            <blockquote className="text-2xl md:text-3xl font-light text-white mb-6 italic">
              &ldquo;The journey of a thousand miles begins with a single step.&rdquo;
            </blockquote>
            <cite className="text-white font-medium">— Lao Tzu</cite>
          </div>
        </div>
      </section>
    );
  };
  
  export default QuoteSection;