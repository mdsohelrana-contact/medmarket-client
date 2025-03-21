const TitleContainer = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto px-6 lg:px-8 py-8">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 font-title">
        {title}
      </h2>
      {description && (
        <p className="px-3 text-lg md:text-xl text-gray-600 dark:text-gray-300 font-description">
          {description}
        </p>
      )}
    </div>
  );
};

export default TitleContainer;
