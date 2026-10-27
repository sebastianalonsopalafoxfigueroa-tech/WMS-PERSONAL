// app.js - Lógica Operativa del WMS

document.addEventListener("DOMContentLoaded", () => {
    renderizarTabla();
    iniciarEscaner();
});

// 1. Obtener inventario desde LocalStorage
function getInventario() {
    return JSON.parse(localStorage.getItem('wms_inventory')) || [];
}

// 2. Guardar inventario
function saveInventario(data) {
    localStorage.setItem('wms_inventory', JSON.stringify(data));
    renderizarTabla();
}

// 3. Renderizar la Tabla y los KPIs
function renderizarTabla(filtro = "") {
    const inventario = getInventario();
    const tbody = document.getElementById("inventory-tbody");
    tbody.innerHTML = "";

    let totalUnits = 0;
    let ubicacionesSet = new Set();

    const filtrados = inventario.filter(item => 
        item.sku.toLowerCase().includes(filtro.toLowerCase()) ||
        item.articulo.toLowerCase().includes(filtro.toLowerCase()) ||
        item.subarticulo.toLowerCase().includes(filtro.toLowerCase())
    );

    filtrados.forEach((item, index) => {
        totalUnits += item.stock;
        ubicacionesSet.add(item.ubicacion);

        const row = document.createElement("tr");
        row.className = "hover:bg-gray-50";
        row.innerHTML = `
            <td class="p-2 font-mono font-bold text-blue-900">${item.sku}</td>
            <td class="p-2">${item.articulo}</td>
            <td class="p-2 text-gray-500">${item.subarticulo}</td>
            <td class="p-2"><span class="bg-gray-200 text-gray-800 px-2 py-1 rounded font-semibold">${item.ubicacion}</span></td>
            <td class="p-2 font-bold ${item.stock < 5 ? 'text-red-600' : 'text-green-700'}">${item.stock} unidades</td>
            <td class="p-2 text-center">
                <button onclick="generarQRModal('${item.sku}')" class="text-blue-600 hover:underline">Ver QR</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Actualizar KPIs
    document.getElementById("kpi-skus").innerText = inventario.length;
    document.getElementById("kpi-units").innerText = totalUnits;
    document.getElementById("kpi-locations").innerText = ubicacionesSet.size;
}

// 4. Procesar Entradas, Salidas y Cambios de Ubicación
function procesarMovimiento(e) {
    e.preventDefault();
    const sku = document.getElementById("form-sku").value.trim();
    const tipo = document.getElementById("form-tipo").value;
    const cantidad = parseInt(document.getElementById("form-cantidad").value);
    const nuevaUbicacion = document.getElementById("form-ubicacion").value;

    let inventario = getInventario();
    let producto = inventario.find(p => p.sku === sku || p.barcode === sku);

    if (!producto) {
        alert("SKU o Código de Barras no encontrado en la base de datos.");
        return;
    }

    if (tipo === "ENTRADA") {
        producto.stock += cantidad;
    } else if (tipo === "SALIDA") {
        if (producto.stock < cantidad) {
            alert("Error: Stock insuficiente para realizar la salida.");
            return;
        }
        producto.stock -= cantidad;
    } else if (tipo === "UBICACION") {
        producto.ubicacion = nuevaUbicacion;
    }

    saveInventario(inventario);
    alert(`Operación ${tipo} realizada con éxito para el SKU: ${producto.sku}`);
    document.getElementById("wms-form").reset();
}

// 5. Filtrar inventario en tiempo real
function filtrarInventario() {
    const query = document.getElementById("search-input").value;
    renderizarTabla(query);
}

// 6. Iniciar lector de cámara
function iniciarEscaner() {
    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        document.getElementById("scanner-result").innerText = `Lectura exitosa: ${decodedText}`;
        document.getElementById("form-sku").value = decodedText;
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        .catch(err => {
            document.getElementById("reader").innerText = "Cámara no activa o sin permisos.";
        });
}

// 7. Restablecer datos iniciales
function reiniciarBaseDatos() {
    if (confirm("¿Deseas reiniciar los datos del almacén a su estado original?")) {
        localStorage.removeItem('wms_inventory');
        location.reload();
    }
}