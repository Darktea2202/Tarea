// ===================================================================
// ALGORITMO DE ORDENAMIENTO: SELECTION SORT
// ===================================================================

/**
 * Selection Sort - Ordenamiento por Selección
 * 
 * FUNCIONAMIENTO:
 * 1. Encuentra el elemento más pequeño del array
 * 2. Lo intercambia con el primer elemento
 * 3. Encuentra el segundo elemento más pequeño
 * 4. Lo intercambia con el segundo elemento
 * 5. Repite hasta ordenar todo el array
 * 
 * COMPLEJIDAD:
 * - Tiempo: O(n²) en todos los casos
 * - Espacio: O(1) - ordena in-place
 */

// ===================================================================
// IMPLEMENTACIÓN BÁSICA
// ===================================================================

function selectionSort(arr) {
    const n = arr.length; // Guardamos la longitud del array para no calcularla en cada iteración
    
    // BUCLE EXTERNO: Recorre cada posición del array que necesita ser ordenada
    // Nota: Solo vamos hasta n-1 porque el último elemento ya estará ordenado automáticamente
    for (let i = 0; i < n - 1; i++) {
        
        // PASO 1: Asumimos que el elemento actual es el mínimo
        let minIndex = i;
        
        // BUCLE INTERNO: Busca el elemento más pequeño en la parte no ordenada
        // Empieza desde i+1 porque los elementos anteriores ya están ordenados
        for (let j = i + 1; j < n; j++) {
            
            // COMPARACIÓN: Si encontramos un elemento menor al mínimo actual
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // Actualizamos el índice del mínimo
            }
        }
        
        // PASO 2: Solo intercambiamos si encontramos un elemento menor
        // Esto evita intercambios innecesarios cuando el elemento ya está en su lugar
        if (minIndex !== i) {
            // INTERCAMBIO: Usamos destructuring para intercambiar elementos
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr; // Retornamos el array ordenado
}

// ===================================================================
// VERSIÓN CON EXPLICACIÓN PASO A PASO
// ===================================================================

function selectionSortConPasos(arr) {
    // MENSAJE INICIAL: Mostramos el array original antes de empezar
    console.log("🔢 ARRAY INICIAL:", arr);
    console.log("═".repeat(50));
    
    const n = arr.length;
    
    // BUCLE PRINCIPAL: Recorre cada posición que necesita ser ordenada
    for (let i = 0; i < n - 1; i++) {
        // INFORMACIÓN DEL PASO: Explicamos qué estamos haciendo en esta iteración
        console.log(`\n📍 PASO ${i + 1}:`);
        console.log(`Buscando el mínimo desde posición ${i}`);
        
        // INICIALIZACIÓN: Empezamos asumiendo que el elemento actual es el mínimo
        let minIndex = i;
        let minValue = arr[i]; // Guardamos el valor para mostrarlo en mensajes
        
        // BÚSQUEDA DEL MÍNIMO: Recorremos la parte no ordenada del array
        for (let j = i + 1; j < n; j++) {
            // COMPARACIÓN: Si encontramos un elemento menor
            if (arr[j] < arr[minIndex]) {
                minIndex = j;           // Actualizamos el índice del mínimo
                minValue = arr[j];      // Actualizamos el valor del mínimo
                // FEEDBACK VISUAL: Informamos cuando encontramos un nuevo mínimo
                console.log(`  ➡️ Nuevo mínimo encontrado: ${minValue} en posición ${j}`);
            }
        }
        
        // INTERCAMBIO: Solo si necesitamos mover el elemento
        if (minIndex !== i) {
            // ANTES DEL INTERCAMBIO: Mostramos qué elementos vamos a intercambiar
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            console.log(`  🔄 Intercambiando ${arr[minIndex]} (pos ${minIndex}) con ${arr[i]} (pos ${i})`);
        } else {
            // CASO SIN INTERCAMBIO: El elemento ya está en su posición correcta
            console.log(`  ✅ El elemento ${arr[i]} ya está en su posición correcta`);
        }
        
        // ESTADO ACTUAL: Mostramos cómo queda el array después de este paso
        console.log(`  📊 Array actual: [${arr.join(', ')}]`);
    }
    
    // RESULTADO FINAL: Confirmamos que el array está completamente ordenado
    console.log("\n🎉 ARRAY FINAL ORDENADO:", arr);
    return arr;
}

// ===================================================================
// VERSIÓN PARA ORDENAMIENTO DESCENDENTE
// ===================================================================

function selectionSortDescendente(arr) {
    const n = arr.length;
    
    // MISMO ALGORITMO pero buscamos el MÁXIMO en lugar del mínimo
    for (let i = 0; i < n - 1; i++) {
        // INICIALIZACIÓN: Asumimos que el elemento actual es el máximo
        let maxIndex = i;
        
        // BÚSQUEDA DEL MÁXIMO: Recorremos la parte no ordenada
        for (let j = i + 1; j < n; j++) {
            // COMPARACIÓN INVERSA: Buscamos elementos MAYORES (no menores)
            if (arr[j] > arr[maxIndex]) {
                maxIndex = j; // Actualizamos el índice del máximo
            }
        }
        
        // INTERCAMBIO: Solo si encontramos un elemento mayor
        if (maxIndex !== i) {
            [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
        }
    }
    
    return arr; // Retorna el array ordenado de mayor a menor
}

// ===================================================================
// VERSIÓN PARA OBJETOS
// ===================================================================

function selectionSortObjetos(arr, key) {
    const n = arr.length;
    
    // ORDENAMIENTO POR PROPIEDAD: Podemos ordenar objetos por cualquier propiedad
    for (let i = 0; i < n - 1; i++) {
        // INICIALIZACIÓN: El objeto actual tiene el valor mínimo de la propiedad
        let minIndex = i;
        
        // BÚSQUEDA: Comparamos la propiedad específica de cada objeto
        for (let j = i + 1; j < n; j++) {
            // ACCESO A PROPIEDAD: Usamos notación de corchetes para acceder dinámicamente
            // arr[j][key] obtiene el valor de la propiedad 'key' del objeto en posición j
            if (arr[j][key] < arr[minIndex][key]) {
                minIndex = j; // Encontramos un objeto con menor valor en esa propiedad
            }
        }
        
        // INTERCAMBIO DE OBJETOS: Movemos objetos completos, no solo valores
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr; // Retorna el array de objetos ordenado por la propiedad especificada
}

// ===================================================================
// EJEMPLOS DE USO
// ===================================================================

console.log("🚀 EJEMPLOS DE SELECTION SORT");
console.log("═".repeat(60));

// Ejemplo 1: Array de números desordenados
console.log("\n1️⃣ EJEMPLO BÁSICO:");
const numeros = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numeros);
// IMPORTANTE: Usamos [...numeros] para crear una copia y no modificar el original
console.log("Ordenado:", selectionSort([...numeros]));

// Ejemplo 2: Con explicación paso a paso
console.log("\n2️⃣ EJEMPLO CON PASOS:");
const numerosConPasos = [5, 2, 8, 1, 9];
// DEMOSTRACIÓN EDUCATIVA: Esta función muestra cada paso del proceso
selectionSortConPasos([...numerosConPasos]);

// Ejemplo 3: Ordenamiento descendente
console.log("\n3️⃣ ORDENAMIENTO DESCENDENTE:");
const numerosDesc = [3, 7, 1, 9, 4];
console.log("Original:", numerosDesc);
// VARIACIÓN: Misma lógica pero ordena de mayor a menor
console.log("Descendente:", selectionSortDescendente([...numerosDesc]));

// Ejemplo 4: Array de strings
console.log("\n4️⃣ ORDENAMIENTO DE STRINGS:");
const nombres = ["Carlos", "Ana", "Luis", "Beatriz", "David"];
console.log("Original:", nombres);
// FUNCIONA CON STRINGS: JavaScript compara strings lexicográficamente (alfabéticamente)
console.log("Ordenado:", selectionSort([...nombres]));

// Ejemplo 5: Array de objetos
console.log("\n5️⃣ ORDENAMIENTO DE OBJETOS:");
const estudiantes = [
    { nombre: "Juan", edad: 20 },     // Objeto con propiedades nombre y edad
    { nombre: "María", edad: 18 },
    { nombre: "Pedro", edad: 22 },
    { nombre: "Ana", edad: 19 }
];
console.log("Original:", estudiantes);
// ORDENAMIENTO POR EDAD: Pasamos 'edad' como segundo parámetro
console.log("Por edad:", selectionSortObjetos([...estudiantes], 'edad'));
// ORDENAMIENTO POR NOMBRE: Pasamos 'nombre' como segundo parámetro
console.log("Por nombre:", selectionSortObjetos([...estudiantes], 'nombre'));

// Ejemplo 6: Casos especiales
console.log("\n6️⃣ CASOS ESPECIALES:");
// ARRAY VACÍO: El algoritmo debe manejar arrays sin elementos
console.log("Array vacío:", selectionSort([]));
// UN SOLO ELEMENTO: Ya está "ordenado" por definición
console.log("Un elemento:", selectionSort([42]));
// YA ORDENADO: El algoritmo funciona igual aunque no sea necesario
console.log("Ya ordenado:", selectionSort([1, 2, 3, 4, 5]));
// ORDENADO INVERSO: Caso que requiere máximo trabajo
console.log("Ordenado inverso:", selectionSort([5, 4, 3, 2, 1]));
// ELEMENTOS DUPLICADOS: Debe manejar valores repetidos correctamente
console.log("Elementos duplicados:", selectionSort([3, 1, 4, 1, 5, 9, 2, 6, 5]));

// ===================================================================
// ANÁLISIS DE RENDIMIENTO
// ===================================================================

function analizarRendimiento() {
    console.log("\n📊 ANÁLISIS DE RENDIMIENTO:");
    console.log("═".repeat(40));
    
    // TAMAÑOS DE PRUEBA: Diferentes cantidades de elementos para ver cómo escala
    const tamaños = [100, 1000, 5000];
    
    // PRUEBA CADA TAMAÑO: Medimos tiempo de ejecución para diferentes volúmenes de datos
    tamaños.forEach(tamaño => {
        // GENERACIÓN DE DATOS: Creamos array aleatorio del tamaño especificado
        // Math.random() * 1000 genera números entre 0 y 999
        // Math.floor() redondea hacia abajo para obtener enteros
        const arr = Array.from({length: tamaño}, () => Math.floor(Math.random() * 1000));
        
        // MEDICIÓN DE TIEMPO: performance.now() da tiempo en milisegundos con alta precisión
        const inicio = performance.now();
        selectionSort([...arr]); // Ordenamos una copia del array
        const fin = performance.now();
        
        // REPORTE: Mostramos cuánto tiempo tomó ordenar ese volumen de datos
        console.log(`Array de ${tamaño} elementos: ${(fin - inicio).toFixed(2)} ms`);
    });
}

// EJECUTAR ANÁLISIS: Llamamos la función para ver los resultados
analizarRendimiento();

// ===================================================================
// COMPARACIÓN CON OTROS ALGORITMOS
// ===================================================================

console.log("\n🆚 COMPARACIÓN:");
console.log("═".repeat(30));
console.log("Selection Sort vs Array.sort() nativo:");

// DATOS DE PRUEBA: Mismo array para comparación justa
const arrayPrueba = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));

// PRUEBA 1: Nuestro Selection Sort
const inicio1 = performance.now();
selectionSort([...arrayPrueba]); // Usamos copia para no afectar la segunda prueba
const fin1 = performance.now();

// PRUEBA 2: Método nativo de JavaScript
const inicio2 = performance.now();
// Array.sort() con función de comparación para ordenamiento numérico
// Sin la función (a, b) => a - b, ordenaría como strings: [1, 10, 2, 20, 3...]
[...arrayPrueba].sort((a, b) => a - b);
const fin2 = performance.now();

// RESULTADOS: Mostramos tiempos y calculamos la diferencia
console.log(`Selection Sort: ${(fin1 - inicio1).toFixed(2)} ms`);
console.log(`Array.sort(): ${(fin2 - inicio2).toFixed(2)} ms`);
// FACTOR DE DIFERENCIA: Cuántas veces más lento es nuestro algoritmo
console.log(`Diferencia: ${((fin1 - inicio1) / (fin2 - inicio2)).toFixed(2)}x más lento`);

// ===================================================================
// VENTAJAS Y DESVENTAJAS
// ===================================================================

console.log("\n✅ VENTAJAS DEL SELECTION SORT:");
console.log("• Simple de entender e implementar");
console.log("• Ordena in-place (no usa memoria extra)");
console.log("• Número fijo de intercambios: O(n)");
console.log("• Funciona bien para arrays pequeños");

console.log("\n❌ DESVENTAJAS DEL SELECTION SORT:");
console.log("• Complejidad O(n²) - lento para arrays grandes");
console.log("• No es estable (puede cambiar orden de elementos iguales)");
console.log("• No es adaptativo (mismo tiempo si ya está ordenado)");
console.log("• Más lento que otros algoritmos O(n²) como Insertion Sort");