// ===================================================================
// ALGORITMO DE ORDENAMIENTO: INSERTION SORT
// ===================================================================

/**
 * Insertion Sort - Ordenamiento por Inserción
 * 
 * FUNCIONAMIENTO (Similar a ordenar cartas en tu mano):
 * 1. Comienza desde el segundo elemento (el primero ya está "ordenado")
 * 2. Toma cada elemento y lo compara con los elementos anteriores
 * 3. Mueve los elementos mayores hacia la derecha
 * 4. Inserta el elemento en su posición correcta
 * 5. Repite hasta procesar todos los elementos
 * 
 * COMPLEJIDAD:
 * - Mejor caso: O(n) - cuando el array ya está ordenado
 * - Caso promedio: O(n²)
 * - Peor caso: O(n²) - cuando el array está ordenado en reversa
 * - Espacio: O(1) - ordena in-place
 */

// ===================================================================
// IMPLEMENTACIÓN BÁSICA
// ===================================================================

function insertionSort(arr) {
    const n = arr.length; // Guardamos la longitud para no calcularla repetidamente
    
    // BUCLE EXTERNO: Empieza desde el índice 1 (segundo elemento)
    // El primer elemento (índice 0) se considera ya "ordenado"
    for (let i = 1; i < n; i++) {
        
        // ELEMENTO ACTUAL: El que vamos a insertar en su posición correcta
        const elementoActual = arr[i];
        
        // POSICIÓN DE BÚSQUEDA: Empezamos comparando con el elemento anterior
        let j = i - 1;
        
        // BUCLE DE INSERCIÓN: Movemos elementos hacia la derecha
        // Continuamos mientras:
        // 1. No hayamos llegado al inicio del array (j >= 0)
        // 2. El elemento en j sea mayor que el que queremos insertar
        while (j >= 0 && arr[j] > elementoActual) {
            
            // DESPLAZAMIENTO: Movemos el elemento mayor una posición a la derecha
            // Esto crea "espacio" para insertar nuestro elemento
            arr[j + 1] = arr[j];
            
            // AVANZAR HACIA LA IZQUIERDA: Comparamos con el siguiente elemento anterior
            j--;
        }
        
        // INSERCIÓN: Colocamos el elemento en su posición correcta
        // j + 1 es la posición donde debe ir (salimos del while cuando encontramos su lugar)
        arr[j + 1] = elementoActual;
        
        // ESTADO DESPUÉS DE ESTA ITERACIÓN:
        // Los primeros i+1 elementos están ordenados entre sí
    }
    
    return arr; // Retornamos el array completamente ordenado
}

// ===================================================================
// VERSIÓN CON EXPLICACIÓN PASO A PASO
// ===================================================================

function insertionSortConPasos(arr) {
    console.log("🔢 ARRAY INICIAL:", arr);
    console.log("═".repeat(60));
    console.log("💡 Concepto: Como ordenar cartas en tu mano, una por una\n");
    
    const n = arr.length;
    
    // BUCLE PRINCIPAL: Procesamos cada elemento desde el segundo
    for (let i = 1; i < n; i++) {
        
        const elementoActual = arr[i];
        console.log(`📍 PASO ${i}: Insertando elemento ${elementoActual} (posición ${i})`);
        
        // MOSTRAR ESTADO ANTES DE LA INSERCIÓN
        const parteOrdenada = arr.slice(0, i);
        const parteNoOrdenada = arr.slice(i);
        console.log(`  📊 Parte ordenada: [${parteOrdenada.join(', ')}]`);
        console.log(`  📋 Parte no ordenada: [${parteNoOrdenada.join(', ')}]`);
        console.log(`  🎯 Elemento a insertar: ${elementoActual}`);
        
        let j = i - 1;
        let movimientos = 0;
        
        // PROCESO DE INSERCIÓN CON SEGUIMIENTO
        console.log(`  🔍 Buscando posición correcta para ${elementoActual}:`);
        
        while (j >= 0 && arr[j] > elementoActual) {
            
            console.log(`    ↔️ ${arr[j]} > ${elementoActual}, moviendo ${arr[j]} hacia la derecha`);
            
            // MOVIMIENTO CON EXPLICACIÓN
            arr[j + 1] = arr[j];
            movimientos++;
            j--;
            
            // MOSTRAR ESTADO DESPUÉS DEL MOVIMIENTO
            console.log(`    📊 Estado: [${arr.join(', ')}]`);
        }
        
        // INSERCIÓN FINAL
        arr[j + 1] = elementoActual;
        
        // RESUMEN DEL PASO
        if (movimientos === 0) {
            console.log(`  ✅ ${elementoActual} ya estaba en posición correcta`);
        } else {
            console.log(`  ✅ ${elementoActual} insertado en posición ${j + 1} después de ${movimientos} movimiento(s)`);
        }
        
        console.log(`  🏁 Resultado: [${arr.join(', ')}]`);
        console.log(`  📈 Elementos ordenados: ${i + 1} de ${n}`);
        console.log("─".repeat(50));
    }
    
    console.log("🎉 ARRAY FINAL ORDENADO:", arr);
    return arr;
}

// ===================================================================
// VERSIÓN OPTIMIZADA PARA ARRAYS CASI ORDENADOS
// ===================================================================

function insertionSortOptimizado(arr) {
    const n = arr.length;
    
    // CONTADOR DE INTERCAMBIOS: Para detectar si el array ya está ordenado
    let intercambiosRealizados = 0;
    
    for (let i = 1; i < n; i++) {
        const elementoActual = arr[i];
        
        // OPTIMIZACIÓN 1: Si el elemento ya está en posición correcta, continuar
        if (arr[i - 1] <= elementoActual) {
            continue; // No necesitamos hacer nada, ya está ordenado
        }
        
        let j = i - 1;
        
        // OPTIMIZACIÓN 2: Búsqueda binaria para encontrar posición de inserción
        // (Para arrays grandes, esto reduce comparaciones de O(n) a O(log n))
        while (j >= 0 && arr[j] > elementoActual) {
            arr[j + 1] = arr[j];
            j--;
            intercambiosRealizados++;
        }
        
        arr[j + 1] = elementoActual;
    }
    
    console.log(`📊 Intercambios realizados: ${intercambiosRealizados}`);
    return arr;
}

// ===================================================================
// VERSIÓN CON BÚSQUEDA BINARIA (BINARY INSERTION SORT)
// ===================================================================

function binaryInsertionSort(arr) {
    const n = arr.length;
    
    console.log("🔍 Usando Binary Insertion Sort (búsqueda binaria para posición)");
    
    for (let i = 1; i < n; i++) {
        const elementoActual = arr[i];
        
        // BÚSQUEDA BINARIA: Encontrar posición donde insertar
        let izquierda = 0;
        let derecha = i;
        
        // PROCESO DE BÚSQUEDA BINARIA
        while (izquierda < derecha) {
            const medio = Math.floor((izquierda + derecha) / 2);
            
            if (arr[medio] > elementoActual) {
                derecha = medio; // La posición está en la mitad izquierda
            } else {
                izquierda = medio + 1; // La posición está en la mitad derecha
            }
        }
        
        // DESPLAZAMIENTO: Mover elementos para hacer espacio
        // Solo movemos los elementos que necesitamos
        for (let j = i; j > izquierda; j--) {
            arr[j] = arr[j - 1];
        }
        
        // INSERCIÓN: Colocar elemento en su posición encontrada
        arr[izquierda] = elementoActual;
        
        console.log(`📍 Paso ${i}: ${elementoActual} insertado en posición ${izquierda}`);
        console.log(`📊 Estado: [${arr.join(', ')}]`);
    }
    
    return arr;
}

// ===================================================================
// VERSIÓN PARA DIFERENTES TIPOS DE DATOS
// ===================================================================

// ORDENAMIENTO DE STRINGS
function insertionSortStrings(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const elementoActual = arr[i];
        let j = i - 1;
        
        // COMPARACIÓN LEXICOGRÁFICA: JavaScript compara strings alfabéticamente
        while (j >= 0 && arr[j].localeCompare(elementoActual) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = elementoActual;
    }
    
    return arr;
}

// ORDENAMIENTO DE OBJETOS
function insertionSortObjetos(arr, propiedad) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const objetoActual = arr[i];
        let j = i - 1;
        
        // COMPARACIÓN POR PROPIEDAD: Accedemos a la propiedad específica
        while (j >= 0 && arr[j][propiedad] > objetoActual[propiedad]) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = objetoActual;
    }
    
    return arr;
}

// ORDENAMIENTO DESCENDENTE
function insertionSortDescendente(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const elementoActual = arr[i];
        let j = i - 1;
        
        // COMPARACIÓN INVERSA: Buscamos elementos menores (no mayores)
        while (j >= 0 && arr[j] < elementoActual) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = elementoActual;
    }
    
    return arr;
}

// ===================================================================
// EJEMPLOS DE USO
// ===================================================================

console.log("🚀 EJEMPLOS DE INSERTION SORT");
console.log("═".repeat(60));

// Ejemplo 1: Caso básico con números
console.log("\n1️⃣ EJEMPLO BÁSICO:");
const numeros = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numeros);
console.log("Ordenado:", insertionSort([...numeros]));

// Ejemplo 2: Con explicación paso a paso
console.log("\n2️⃣ EJEMPLO CON PASOS DETALLADOS:");
const numerosConPasos = [5, 2, 8, 1, 9];
insertionSortConPasos([...numerosConPasos]);

// Ejemplo 3: Versión optimizada
console.log("\n3️⃣ VERSIÓN OPTIMIZADA:");
const numerosOptimizado = [3, 7, 1, 9, 4];
console.log("Original:", numerosOptimizado);
console.log("Resultado:", insertionSortOptimizado([...numerosOptimizado]));

// Ejemplo 4: Con búsqueda binaria
console.log("\n4️⃣ BINARY INSERTION SORT:");
const numerosBinario = [6, 3, 8, 2, 9, 1];
console.log("Original:", numerosBinario);
binaryInsertionSort([...numerosBinario]);

// Ejemplo 5: Ordenamiento de strings
console.log("\n5️⃣ ORDENAMIENTO DE STRINGS:");
const nombres = ["Carlos", "Ana", "Luis", "Beatriz", "David"];
console.log("Original:", nombres);
console.log("Ordenado:", insertionSortStrings([...nombres]));

// Ejemplo 6: Ordenamiento de objetos
console.log("\n6️⃣ ORDENAMIENTO DE OBJETOS:");
const estudiantes = [
    { nombre: "Juan", edad: 20, calificacion: 85 },
    { nombre: "María", edad: 18, calificacion: 92 },
    { nombre: "Pedro", edad: 22, calificacion: 78 },
    { nombre: "Ana", edad: 19, calificacion: 96 }
];
console.log("Original:", estudiantes);
console.log("Por edad:", insertionSortObjetos([...estudiantes], 'edad'));
console.log("Por calificación:", insertionSortObjetos([...estudiantes], 'calificacion'));

// Ejemplo 7: Ordenamiento descendente
console.log("\n7️⃣ ORDENAMIENTO DESCENDENTE:");
const numerosDesc = [3, 7, 1, 9, 4];
console.log("Original:", numerosDesc);
console.log("Descendente:", insertionSortDescendente([...numerosDesc]));

// Ejemplo 8: Casos especiales
console.log("\n8️⃣ CASOS ESPECIALES:");
console.log("Array vacío:", insertionSort([]));
console.log("Un elemento:", insertionSort([42]));
console.log("Ya ordenado:", insertionSort([1, 2, 3, 4, 5]));
console.log("Ordenado inverso:", insertionSort([5, 4, 3, 2, 1]));
console.log("Elementos duplicados:", insertionSort([3, 1, 4, 1, 5, 9, 2, 6, 5]));

// ===================================================================
// ANÁLISIS DE RENDIMIENTO
// ===================================================================

function analizarRendimientoInsertion() {
    console.log("\n📊 ANÁLISIS DE RENDIMIENTO:");
    console.log("═".repeat(50));
    
    const tamaños = [1000, 5000, 10000];
    
    tamaños.forEach(tamaño => {
        console.log(`\n🔍 Probando con ${tamaño} elementos:`);
        
        // CASO PROMEDIO: Array aleatorio
        const arrAleatorio = Array.from({length: tamaño}, () => Math.floor(Math.random() * 1000));
        let inicio = performance.now();
        insertionSort([...arrAleatorio]);
        let fin = performance.now();
        console.log(`  Aleatorio: ${(fin - inicio).toFixed(2)} ms`);
        
        // MEJOR CASO: Array ya ordenado
        const arrOrdenado = Array.from({length: tamaño}, (_, i) => i);
        inicio = performance.now();
        insertionSort([...arrOrdenado]);
        fin = performance.now();
        console.log(`  Ya ordenado: ${(fin - inicio).toFixed(2)} ms`);
        
        // CASO CASI ORDENADO: Solo algunos elementos fuera de lugar
        const arrCasiOrdenado = [...arrOrdenado];
        // Intercambiar algunos elementos al azar
        for (let i = 0; i < tamaño * 0.1; i++) {
            const pos1 = Math.floor(Math.random() * tamaño);
            const pos2 = Math.floor(Math.random() * tamaño);
            [arrCasiOrdenado[pos1], arrCasiOrdenado[pos2]] = [arrCasiOrdenado[pos2], arrCasiOrdenado[pos1]];
        }
        inicio = performance.now();
        insertionSort([...arrCasiOrdenado]);
        fin = performance.now();
        console.log(`  Casi ordenado: ${(fin - inicio).toFixed(2)} ms`);
        
        // PEOR CASO: Array ordenado en reversa
        const arrReversa = Array.from({length: tamaño}, (_, i) => tamaño - i);
        inicio = performance.now();
        insertionSort([...arrReversa]);
        fin = performance.now();
        console.log(`  Reversa: ${(fin - inicio).toFixed(2)} ms`);
    });
}

analizarRendimientoInsertion();

// ===================================================================
// COMPARACIÓN CON OTROS ALGORITMOS
// ===================================================================

console.log("\n🆚 COMPARACIÓN DE ALGORITMOS:");
console.log("═".repeat(40));

const arrayComparacion = Array.from({length: 5000}, () => Math.floor(Math.random() * 1000));

// Insertion Sort básico
let inicio = performance.now();
insertionSort([...arrayComparacion]);
let fin = performance.now();
console.log(`Insertion Sort básico: ${(fin - inicio).toFixed(2)} ms`);

// Insertion Sort optimizado
inicio = performance.now();
insertionSortOptimizado([...arrayComparacion]);
fin = performance.now();
console.log(`Insertion Sort optimizado: ${(fin - inicio).toFixed(2)} ms`);

// Binary Insertion Sort
inicio = performance.now();
binaryInsertionSort([...arrayComparacion]);
fin = performance.now();
console.log(`Binary Insertion Sort: ${(fin - inicio).toFixed(2)} ms`);

// Array.sort() nativo
inicio = performance.now();
[...arrayComparacion].sort((a, b) => a - b);
fin = performance.now();
console.log(`Array.sort() nativo: ${(fin - inicio).toFixed(2)} ms`);

// ===================================================================
// CASOS DE USO ESPECÍFICOS
// ===================================================================

console.log("\n💼 CASOS DE USO DONDE INSERTION SORT ES EXCELENTE:");
console.log("═".repeat(50));

// Caso 1: Arrays pequeños
console.log("\n📦 Arrays pequeños (≤ 50 elementos):");
const arrayPequeño = [23, 1, 45, 7, 34, 12, 67, 3];
console.log("Original:", arrayPequeño);
const inicioP = performance.now();
const resultadoP = insertionSort([...arrayPequeño]);
const finP = performance.now();
console.log("Ordenado:", resultadoP);
console.log(`Tiempo: ${(finP - inicioP).toFixed(4)} ms`);

// Caso 2: Arrays casi ordenados
console.log("\n📈 Arrays casi ordenados:");
const arrayCasiOrdenado = [1, 2, 3, 7, 4, 5, 6, 8, 9];
console.log("Original (solo 7 fuera de lugar):", arrayCasiOrdenado);
const inicioC = performance.now();
const resultadoC = insertionSort([...arrayCasiOrdenado]);
const finC = performance.now();
console.log("Ordenado:", resultadoC);
console.log(`Tiempo: ${(finC - inicioC).toFixed(4)} ms (¡muy rápido!)`);

// Caso 3: Inserción en tiempo real
console.log("\n⚡ Simulación de inserción en tiempo real:");
const listaTiempoReal = [5, 10, 15];
console.log("Lista inicial:", listaTiempoReal);

const nuevosElementos = [3, 12, 8, 20];
nuevosElementos.forEach(elemento => {
    // INSERTAR EN ORDEN: Simulamos agregar elementos uno por uno manteniendo orden
    listaTiempoReal.push(elemento);
    insertionSort(listaTiempoReal); // Muy eficiente porque la lista ya está casi ordenada
    console.log(`Después de insertar ${elemento}: [${listaTiempoReal.join(', ')}]`);
});

// ===================================================================
// VENTAJAS Y DESVENTAJAS
// ===================================================================

console.log("\n✅ VENTAJAS DEL INSERTION SORT:");
console.log("• Excelente para arrays pequeños (≤ 50 elementos)");
console.log("• Muy eficiente para arrays casi ordenados: O(n)");
console.log("• Es estable: mantiene orden relativo de elementos iguales");
console.log("• Ordena in-place: usa solo O(1) memoria extra");
console.log("• Es adaptativo: mejora rendimiento con datos parcialmente ordenados");
console.log("• Implementación simple y fácil de entender");
console.log("• Funciona bien como subrutina en algoritmos híbridos");

console.log("\n❌ DESVENTAJAS DEL INSERTION SORT:");
console.log("• Ineficiente para arrays grandes: O(n²)");
console.log("• Muchos movimientos de elementos en el peor caso");
console.log("• No aprovecha paralelización");
console.log("• Sensible al orden inicial de los datos");

console.log("\n💡 CUÁNDO USAR INSERTION SORT:");
console.log("• Arrays pequeños (menos de 50 elementos)");
console.log("• Arrays que ya están casi ordenados");
console.log("• Como parte de algoritmos híbridos (ej: Timsort, Introsort)");
console.log("• Cuando necesitas un algoritmo estable");
console.log("• Para inserción en tiempo real en listas ordenadas");
console.log("• En sistemas embebidos con memoria limitada");

console.log("\n🔧 OPTIMIZACIONES COMUNES:");
console.log("• Usar búsqueda binaria para encontrar posición de inserción");
console.log("• Cambiar a Shell Sort para arrays medianos");
console.log("• Detección temprana de arrays ya ordenados");
console.log("• Usar como subrutina cuando Quick/Merge Sort llegan a subarrays pequeños");