// database.js - Base de Datos Inicial del Almacén

// 1. Zonas y Ubicaciones del Almacén
const WMS_LOCATIONS = [
    { id: "A-01-1", zona: "Camisas", capacidad: 10 },
    { id: "A-01-2", zona: "Camisas", capacidad: 10 },
    { id: "B-01-1", zona: "Pantalones", capacidad: 15 },
    { id: "B-01-2", zona: "Shorts", capacidad: 15 },
    { id: "C-01-1", zona: "Playeras", capacidad: 20 },
    { id: "D-01-1", zona: "Gorras", capacidad: 25 },
    { id: "E-01-1", zona: "Sudaderas", capacidad: 12 }
];

// 2. Catálogo de Productos (Sustituye o añade los tuyos aquí)
const INITIAL_PRODUCTS = [
    {
        sku: "CM-C-EAZ-CH-CA-AM1",
        articulo: "Camisa",
        subarticulo: "Camisa casual",
        barcode: "750100000001",
        ubicacion: "A-01-1",
        stock: 8
    },
    {
        sku: "CM-F-BL-CH-PC-AM1",
        articulo: "Camisa",
        subarticulo: "Camisa formal",
        barcode: "750100000002",
        ubicacion: "A-01-2",
        stock: 5
    },
    {
        sku: "PN-MZ-AZ-XL-SM-CJ",
        articulo: "Pantalón",
        subarticulo: "Pantalon baggy",
        barcode: "750100000003",
        ubicacion: "B-01-1",
        stock: 12
    },
    {
        sku: "SH-MZ-NG-32-PB-CJ",
        articulo: "Pantalón",
        subarticulo: "Short baggy",
        barcode: "750100000004",
        ubicacion: "B-01-2",
        stock: 14
    },
    {
        sku: "PL-DC-AZ-S-CHN-AM1",
        articulo: "Playera",
        subarticulo: "Playera deportiva compresion",
        barcode: "750100000005",
        ubicacion: "C-01-1",
        stock: 18
    },
    {
        sku: "GR-F1-AL-AJ-NE-MS",
        articulo: "Gorra",
        subarticulo: "Gorra Alpine",
        barcode: "750100000006",
        ubicacion: "D-01-1",
        stock: 22
    },
    {
        sku: "SD-RV-NG-L-RD-AM2",
        articulo: "Sudadera",
        subarticulo: "Sudadera rompevientos",
        barcode: "750100000007",
        ubicacion: "E-01-1",
        stock: 9
    }
];

// Cargar o Inicializar en el Almacenamiento Local (LocalStorage)
if (!localStorage.getItem('wms_inventory')) {
    localStorage.setItem('wms_inventory', JSON.stringify(INITIAL_PRODUCTS));
}