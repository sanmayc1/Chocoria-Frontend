import React, { useState, useRef } from "react";

const ProductImageView = ({ imageUrl }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Calculate relative position within the container
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Keep values within bounds
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setPosition({ x: boundedX, y: boundedY });
  };

  return (
    <>
      <div className="hidden lg:block ">
        <div className="relative h-full xl:w-[630px] lg:w-[450px] bg-white rounded-xl flex justify-center items-center overflow-hidden">
          {/* Regular Image */}
          <div
            ref={containerRef}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="hover:cursor-zoom-in"
          >
            <img
              src={imageUrl}
              alt=""
              className="object-contain xl:h-[300px] lg:h-[200px]"
            />
          </div>
        </div>
      </div>
      {/* Zoomed Image */}
      {isZoomed && (
        <div
          className=" absolute bg-white xl:w-96 xl:h-96 lg:h-72 lg:w-72 xl:top-[30%] xl:left-[56%] lg:left-[59%] lg:top-[40%] inset-0  pointer-events-none"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "200%",
            backgroundPositionX: `${position.x}%`,
            backgroundPositionY: `${position.y}%`,
          }}
        ></div>
      )}
    </>
  );
};

export default ProductImageView;
