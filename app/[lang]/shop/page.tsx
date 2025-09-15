import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';
import { Filter, Search } from "lucide-react";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from "@/lib/data";
import { getTranslations } from 'next-intl/server';

export default async function ShopPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations('Shop');
  const tc = await getTranslations('Shop.categories');
  const ts = await getTranslations('Shop.sortOptions');
  const searchParams = await searchParamsPromise;
  const category = (Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category) as "clothes" | "accessories" | "tech" | "all" | undefined;
  const search = Array.isArray(searchParams.search) ? searchParams.search[0] : searchParams.search;
  const sort = Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort;

  // Get filtered products
  let products;
  if (search) {
    products = await searchProducts(search);
  } else if (category && category !== "all") {
    products = await getProductsByCategory(category);
  } else {
    products = await getAllProducts(); // Mostrar todos los productos si no hay búsqueda ni categoría
  }

  // Apply sorting
  if (sort) {
    switch (sort) {
      case "price-low":
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case "name":
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  const categories = [
    { value: "all", label: tc('all') },
    { value: "clothes", label: tc('clothes') },
    { value: "accessories", label: tc('accessories') },
    { value: "tech", label: tc('tech') },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('header.title')}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {t('header.description')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <form action="/shop" method="get" className="flex items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="search"
                      name="search"
                      placeholder={t('searchPlaceholder')}
                      defaultValue={search}
                      className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 w-full"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="default" 
                    className="ml-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white sm:px-6"
                  >
                    <span className="sr-only sm:not-sr-only">{t('searchButton') || 'Buscar'}</span>
                    <Search className="h-4 w-4 sm:hidden" />
                  </Button>
                  {category && (
                    <input type="hidden" name="category" value={category} />
                  )}
                  {sort && <input type="hidden" name="sort" value={sort} />}
                </form>
              </div>

              {/* Category Filter */}
              <Select defaultValue={category || "all"}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder={t('category')} />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {categories.map((cat) => (
                    <SelectItem className="text-white" key={cat.value} value={cat.value}>
                      <a
                        className=""
                        href={`/shop${
                          cat.value !== "all" ? `?category=${cat.value}` : ""
                        }${
                          search
                            ? `${
                                cat.value !== "all" ? "&" : "?"
                              }search=${search}`
                            : ""
                        }${sort ? `&sort=${sort}` : ""}`}
                      >
                        {cat.label}
                      </a>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <Select defaultValue={sort || "default"}>
              <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder={t('sort')} />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="default">
                  <a
                    href={`/shop${category ? `?category=${category}` : ""}${
                      search ? `${category ? "&" : "?"}search=${search}` : ""
                    }`}
                  >
                    {ts('default')}
                  </a>
                </SelectItem>
                <SelectItem value="price-low">
                  <a
                    href={`/shop?${category ? `category=${category}&` : ""}${
                      search ? `search=${search}&` : ""
                    }sort=price-low`}
                  >
                    {ts('priceLow')}
                  </a>
                </SelectItem>
                <SelectItem value="price-high">
                  <a
                    href={`/shop?${category ? `category=${category}&` : ""}${
                      search ? `search=${search}&` : ""
                    }sort=price-high`}
                  >
                    {ts('priceHigh')}
                  </a>
                </SelectItem>
                <SelectItem value="name">
                  <a
                    href={`/shop?${category ? `category=${category}&` : ""}${
                      search ? `search=${search}&` : ""
                    }sort=name`}
                  >
                    {ts('name')}
                  </a>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(category || search) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-400 text-sm">{t('activeFilters')}</span>
              {category && category !== "all" && (
                <Badge
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-400"
                >
                  {t('categoryLabel')} 
                  {categories.find((c) => c.value === category)?.label}
                  <a
                    href={`/shop${search ? `?search=${search}` : ""}`}
                    className="ml-2 hover:text-cyan-300"
                  >
                    ×
                  </a>
                </Badge>
              )}
              {search && (
                <Badge
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-400"
                >
                  {t('searchLabel')} "{search}"
                  <a
                    href={`/shop${category ? `?category=${category}` : ""}`}
                    className="ml-2 hover:text-cyan-300"
                  >
                    ×
                  </a>
                </Badge>
              )}
              <a
                href="/shop"
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                {t('clearAll')}
              </a>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            {t.raw('showing').replace('{count}', products.length.toString()).replace('{total}', products.length.toString())}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Suspense fallback={<div>Loading products...</div>}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('noProducts')}</h3>
              <p className="text-gray-500">
                {t('noProductsDescription')}
              </p>
            </div>
            <a href="/shop">
              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                {t('showAll')}
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}