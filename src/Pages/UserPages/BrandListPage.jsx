import { useEffect, useState } from "react";
import { getAllBrandsUser } from "../../Services/api/brand";
import BrandCard from "../../Components/User/Brand/BrandCard";
import { CircularProgress } from "@mui/material";

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllBrand = async () => {
      setLoading(true);
      const response = await getAllBrandsUser();
      if (response.status === 200) {
        setBrands(response.data.brands);
        setLoading(false);
        return;
      }
    };
    fetchAllBrand();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }

  return (
    <div className="h-auto min-h-screen ">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-10 w-[70%] pb-10 mx-auto">
        {brands.map((brand) => {
          return <BrandCard key={brand._id} src={brand.image} id={brand._id} />;
        })}
      </div>
    </div>
  );
};

export default BrandListPage;
