const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  };

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className={`${sizeClasses[size]} border-4 border-muted border-t-primary rounded-full animate-spin mb-4`} />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
