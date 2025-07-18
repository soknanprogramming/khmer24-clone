INSERT INTO `productcategory` (`ID`, `Name`, `Icon`, `IsActive`) VALUES
(1, 'Computers & Accessories', 's-computer-and-accessories-1638848160.webp', 1);


INSERT INTO `productsubcategory` (`ID`, `Name`, `Icon`, `ProductCategoryID`, `IsActive`) VALUES
(1, 'Laptops', 's-laptops-1638864565.webp', 1, 1),
(2, 'Desktops', 's-desktops-1638927496.webp', 1, 1),
(3, 'All-In-One', 's-all-in-one-pc-1638927503.webp', 1, 1),
(4, 'Monitors', 's-monitors-1638927508.webp', 1, 1),
(5, 'Printers & Scanners', 's-printers-and-scanners-1638927513.webp', 1, 1),
(6, 'Parts & Accessories', 's-computer-parts-and-accessories-1638927519.webp', 1, 1),
(7, 'Softwares', 's-softwares-1638927558.webp', 1, 1);


INSERT INTO `brand` (`ID`, `Name`, `Icon`, `ProductID`, `IsActive`) VALUES
(1, 'Acer', 's-acer-1634629929.png', 1, 1),
(2, 'Apple', 's-apple-1634630145.png', 1, 1),
(3, 'Asus', 's-asus-1634629941.png', 1, 1),
(4, 'Dell', 's-dell-1634630151.png', 1, 1),
(5, 'Epson', 's-epson-1634631988.png', 1, 1),
(6, 'Fukitsu', 's-fujitsu-1634630447.png', 1, 1),
(7, 'Gateway', 's-gateway-1634630454.png', 1, 1),
(8, 'Hp', 's-hp-1634630460.png', 1, 1),
(9, 'Lenovo', 's-lenovo-1634630767.png', 1, 1),
(10, 'Microsoft', 's-microsoft-1634631888.png', 1, 1),
(11, 'MSI', 's-msi-1634631286.png', 1, 1),
(12, 'Panasonic', 's-panasonic-1634631280.png', 1, 1),
(13, 'Samsung', 's-samsung-1634631291.png', 1, 1),
(14, 'Sony', 's-sony-1634631501.png', 1, 1),
(15, 'Toshiba', 's-toshiba-1634631711.png', 1, 1);


INSERT INTO `product_requirements` (`ID`, `productSubCategoryID`, `ProductName`, `ProductBrand`, `TaxType`, `Condition`, `Color`, `Transmission`, `EngineType`, `BodyType`, `Vga`, `Cpu`, `Ram`, `Storage`, `Screen`, `Price`, `Discount`, `IsFreeDelivery`, `Description`, `City`, `District`, `Commune`, `Address`, `Latitude`, `Longitude`, `CreatedDate`, `IsActive`, `ProductDetail`) VALUES
(1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

