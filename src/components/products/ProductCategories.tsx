
import { Button } from "@/components/ui/button";
import { Briefcase, Router, Server, Tv2, Zap, Laptop, Watch, Printer, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}

interface ProductCategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  isLoading: boolean;
}

const ProductCategories = ({
  categories,
  selectedCategory,
  onSelectCategory,
  isLoading
}: ProductCategoriesProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'router':
        return <Router className="h-4 w-4" />;
      case 'server':
        return <Server className="h-4 w-4" />;
      case 'projector':
        return <Tv2 className="h-4 w-4" />;
      case 'zap':
        return <Zap className="h-4 w-4" />;
      case 'laptop':
        return <Laptop className="h-4 w-4" />;
      case 'watch':
        return <Watch className="h-4 w-4" />;
      case 'printer':
        return <Printer className="h-4 w-4" />;
      case 'building-2':
        return <Building2 className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        className="whitespace-nowrap"
      >
        <Briefcase className="h-4 w-4 mr-2" />
        All Products
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          className="whitespace-nowrap"
        >
          {getIcon(category.icon)}
          <span className="ml-2">{category.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default ProductCategories;
