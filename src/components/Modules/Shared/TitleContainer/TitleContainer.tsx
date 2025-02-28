const TitleContainer = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto px-4 md:px-8 py-6">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-title ">
        {title}
      </h2>
      {description && (
        <p className="mt-2 font-description text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </div>
  );
};

export default TitleContainer;
