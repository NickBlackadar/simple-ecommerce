import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const { data, isLoading, isError } = useProducts({ page, pageSize });
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (isError) return <div>Error loading data</div>;

  if (isLoading) return <div>Loading...</div>;

  const nextPage = () => {
    if (data?.next) setPage(page + 1);
  };

  const prevPage = () => {
    if (data?.previous) setPage(page - 1);
  };

  return (
    <MaxWidthWrapper>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {data?.results.map((product) => (
          <div key={product._id}>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </div>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={prevPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={nextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
