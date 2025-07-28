// ===================================================================
// ALGORITMO DE ORDENAMIENTO: QUICK SORT
// ===================================================================

/**
 * Quick Sort - Ordenamiento Rápido
 * 
 * FUNCIONAMIENTO (Divide y Vencerás):
 * 1. Elige un elemento como "pivot" (pivote)
 * 2. Particiona el array: elementos menores a la izquierda, mayores a la derecha
 * 3. Aplica recursivamente Quick Sort a ambas particiones
 * 4. Combina los resultados (ya están ordenados por la partición)
 * 
 * COMPLEJIDAD:
 * - Mejor caso: O(n log n) - pivot divide el array por la mitad
 * - Caso promedio: O(n log n) 
 * - Peor caso: O(n²) - pivot siempre es el menor o mayor elemento
 * - Espacio: O(log n) - debido a la recursión
 */

// ===================================================================
// IMPLEMENTACIÓN PRINCIPAL - VERSIÓN RECURSIVA
// ===================================================================

function quickSort(arr, inicio = 0, fin = arr.length - 1) {
    // CASO BASE: Si el subarray tiene 0 o 1 elemento, ya está ordenado
    // Esto detiene la recursión cuando no hay más elementos que ordenar
    if (inicio < fin) {
        
        // PASO 1: PARTICIÓN
        // La función partition reorganiza el array y retorna la posición final del pivot
        // Después de partition:
        // - Todos los elementos a la izquierda del pivot son menores
        // - Todos los elementos a la derecha del pivot son mayores
        const indicePivot = partition(arr, inicio, fin);
        
        // PASO 2: RECURSIÓN EN LA PARTICIÓN IZQUIERDA
        // Ordenamos todos los elementos menores al pivot
        // Van desde 'inicio' hasta 'indicePivot - 1'
        quickSort(arr, inicio, indicePivot - 1);
        
        // PASO 3: RECURSIÓN EN LA PARTICIÓN DERECHA  
        // Ordenamos todos los elementos mayores al pivot
        // Van desde 'indicePivot + 1' hasta 'fin'
        quickSort(arr, indicePivot + 1, fin);
        
        // NOTA: No necesitamos "combinar" los resultados porque la partición
        // ya colocó cada elemento en el lado correcto del pivot
    }
    
    return arr; // Retornamos el array completamente ordenado
}

// ===================================================================
// FUNCIÓN DE PARTICIÓN - CORAZÓN DEL ALGORITMO
// ===================================================================

function partition(arr, inicio, fin) {
    // ELECCIÓN DEL PIVOT: Usamos el último elemento como pivot
    // Otras estrategias: primer elemento, elemento del medio, mediana de tres
    const pivot = arr[fin];
    
    // ÍNDICE DEL MENOR: Rastrea la posición donde debería ir el próximo elemento menor
    // Inicialmente apunta a la posición antes del primer elemento
    let indiceMenor = inicio - 1;
    
    // PROCESO DE PARTICIÓN: Recorremos desde 'inicio' hasta 'fin-1'
    // No incluimos 'fin' porque es nuestro pivot
    for (let j = inicio; j < fin; j++) {
        
        // COMPARACIÓN: Si el elemento actual es menor o igual al pivot
        if (arr[j] <= pivot) {
            
            // INCREMENTAR ÍNDICE: Movemos la frontera de elementos menores
            indiceMenor++;
            
            // INTERCAMBIO: Colocamos el elemento menor en su región correcta
            // Intercambiamos arr[indiceMenor] con arr[j]
            [arr[indiceMenor], arr[j]] = [arr[j], arr[indiceMenor]];
            
            // ESTADO DESPUÉS DEL INTERCAMBIO:
            // [elementos ≤ pivot][elementos > pivot][elementos sin procesar][pivot]
        }
        
        // Si arr[j] > pivot, no hacemos nada, ya está en el lado correcto
    }
    
    // COLOCAR PIVOT EN SU POSICIÓN FINAL:
    // El pivot debe ir después de todos los elementos menores
    [arr[indiceMenor + 1], arr[fin]] = [arr[fin], arr[indiceMenor + 1]];
    
    // RETORNAR POSICIÓN DEL PIVOT: Esta será la frontera para las llamadas recursivas
    return indiceMenor + 1;
}

// ===================================================================
// VERSIÓN CON EXPLICACIÓN PASO A PASO
// ===================================================================

function quickSortConPasos(arr, inicio = 0, fin = arr.length - 1, nivel = 0) {
    // INDENTACIÓN VISUAL: Para mostrar el nivel de recursión
    const indent = "  ".repeat(nivel);
    
    // INFORMACIÓN DEL LLAMADO: Mostramos qué parte estamos procesando
    console.log(`${indent}🔍 QuickSort llamado: arr[${inicio}..${fin}] = [${arr.slice(inicio, fin + 1).join(', ')}]`);
    
    // CASO BASE: Verificamos si necesitamos seguir dividiendo
    if (inicio < fin) {
        
        // ANTES DE LA PARTICIÓN: Mostramos el estado actual
        console.log(`${indent}📍 Pivot elegido: ${arr[fin]} (posición ${fin})`);
        
        // PARTICIÓN CON SEGUIMIENTO
        const indicePivot = partitionConPasos(arr, inicio, fin, nivel);
        
        // DESPUÉS DE LA PARTICIÓN: Mostramos cómo quedó el array
        console.log(`${indent}✅ Después de partición: [${arr.join(', ')}]`);
        console.log(`${indent}🎯 Pivot ${arr[indicePivot]} está en posición final ${indicePivot}`);
        
        // LLAMADAS RECURSIVAS CON INFORMACIÓN
        if (inicio < indicePivot - 1) {
            console.log(`${indent}⬅️ Procesando lado izquierdo...`);
            quickSortConPasos(arr, inicio, indicePivot - 1, nivel + 1);
        }
        
        if (indicePivot + 1 < fin) {
            console.log(`${indent}➡️ Procesando lado derecho...`);
            quickSortConPasos(arr, indicePivot + 1, fin, nivel + 1);
        }
        
        // FINALIZACIÓN DEL NIVEL
        console.log(`${indent}🏁 Completado nivel ${nivel}`);
    } else {
        // CASO BASE ALCANZADO
        console.log(`${indent}🛑 Caso base: subarray de ${fin - inicio + 1} elemento(s) ya ordenado`);
    }
    
    return arr;
}

// FUNCIÓN DE PARTICIÓN CON SEGUIMIENTO VISUAL
function partitionConPasos(arr, inicio, fin, nivel) {
    const indent = "  ".repeat(nivel);
    const pivot = arr[fin];
    let indiceMenor = inicio - 1;
    
    console.log(`${indent}🔄 Iniciando partición con pivot = ${pivot}`);
    
    // PROCESO DE PARTICIÓN CON EXPLICACIÓN
    for (let j = inicio; j < fin; j++) {
        console.log(`${indent}   Comparando ${arr[j]} con pivot ${pivot}`);
        
        if (arr[j] <= pivot) {
            indiceMenor++;
            
            if (indiceMenor !== j) {
                console.log(`${indent}   ↔️ Intercambiando ${arr[indiceMenor]} y ${arr[j]}`);
                [arr[indiceMenor], arr[j]] = [arr[j], arr[indiceMenor]];
            } else {
                console.log(`${indent}   ✅ ${arr[j]} ya está en posición correcta`);
            }
            
            console.log(`${indent}   Estado: [${arr.join(', ')}]`);
        } else {
            console.log(`${indent}   ➡️ ${arr[j]} > ${pivot}, permanece a la derecha`);
        }
    }
    
    // COLOCAR PIVOT EN POSICIÓN FINAL
    console.log(`${indent}🎯 Colocando pivot en posición final`);
    [arr[indiceMenor + 1], arr[fin]] = [arr[fin], arr[indiceMenor + 1]];
    
    return indiceMenor + 1;
}

// ===================================================================
// VERSIÓN ITERATIVA (SIN RECURSIÓN)
// ===================================================================

function quickSortIterativo(arr) {
    // SIMULAMOS LA RECURSIÓN CON UNA PILA (STACK)
    // Cada elemento de la pila contiene [inicio, fin] de un subarray por procesar
    const pila = [[0, arr.length - 1]];
    
    console.log("🔄 Iniciando Quick Sort iterativo");
    
    // MIENTRAS TENGAMOS SUBARRAYS POR PROCESAR
    while (pila.length > 0) {
        
        // EXTRAER SIGUIENTE SUBARRAY: Simulamos el "llamado" recursivo
        const [inicio, fin] = pila.pop();
        
        console.log(`📍 Procesando subarray [${inicio}..${fin}]: [${arr.slice(inicio, fin + 1).join(', ')}]`);
        
        // VERIFICAR SI NECESITA PARTICIÓN
        if (inicio < fin) {
            
            // PARTICIÓN: Igual que en la versión recursiva
            const indicePivot = partition(arr, inicio, fin);
            
            console.log(`✅ Pivot ${arr[indicePivot]} colocado en posición ${indicePivot}`);
            
            // AGREGAR SUBARRAYS A LA PILA: En lugar de llamadas recursivas
            // Agregamos las dos mitades a la pila para procesarlas después
            
            // LADO IZQUIERDO: elementos menores al pivot
            if (inicio < indicePivot - 1) {
                pila.push([inicio, indicePivot - 1]);
                console.log(`📝 Agregado a pila: lado izquierdo [${inicio}..${indicePivot - 1}]`);
            }
            
            // LADO DERECHO: elementos mayores al pivot
            if (indicePivot + 1 < fin) {
                pila.push([indicePivot + 1, fin]);
                console.log(`📝 Agregado a pila: lado derecho [${indicePivot + 1}..${fin}]`);
            }
        }
        
        console.log(`📊 Estado actual del array: [${arr.join(', ')}]`);
        console.log(`📚 Elementos en pila: ${pila.length}`);
        console.log("─".repeat(50));
    }
    
    console.log("🎉 Quick Sort iterativo completado");
    return arr;
}

// ===================================================================
// DIFERENTES ESTRATEGIAS PARA ELEGIR PIVOT
// ===================================================================

// ESTRATEGIA 1: Pivot como primer elemento
function quickSortPrimerElemento(arr, inicio = 0, fin = arr.length - 1) {
    if (inicio < fin) {
        // MOVER PRIMER ELEMENTO AL FINAL para usar la misma función partition
        [arr[inicio], arr[fin]] = [arr[fin], arr[inicio]];
        
        const indicePivot = partition(arr, inicio, fin);
        quickSortPrimerElemento(arr, inicio, indicePivot - 1);
        quickSortPrimerElemento(arr, indicePivot + 1, fin);
    }
    return arr;
}

// ESTRATEGIA 2: Pivot como elemento del medio
function quickSortElementoMedio(arr, inicio = 0, fin = arr.length - 1) {
    if (inicio < fin) {
        // CALCULAR POSICIÓN DEL MEDIO
        const medio = Math.floor((inicio + fin) / 2);
        
        // MOVER ELEMENTO DEL MEDIO AL FINAL
        [arr[medio], arr[fin]] = [arr[fin], arr[medio]];
        
        const indicePivot = partition(arr, inicio, fin);
        quickSortElementoMedio(arr, inicio, indicePivot - 1);
        quickSortElementoMedio(arr, indicePivot + 1, fin);
    }
    return arr;
}

// ESTRATEGIA 3: Mediana de tres (mejor rendimiento)
function quickSortMedianaDeTres(arr, inicio = 0, fin = arr.length - 1) {
    
    // FUNCIÓN AUXILIAR: Encuentra la mediana entre tres elementos
    function medianaDeTres(arr, inicio, medio, fin) {
        // COMPARAMOS LOS TRES ELEMENTOS y retornamos el índice del valor medio
        if (arr[inicio] > arr[medio]) {
            if (arr[medio] > arr[fin]) return medio;          // inicio > medio > fin
            else if (arr[inicio] > arr[fin]) return fin;      // inicio > fin > medio
            else return inicio;                               // fin > inicio > medio
        } else {
            if (arr[inicio] > arr[fin]) return inicio;        // medio > inicio > fin
            else if (arr[medio] > arr[fin]) return fin;       // medio > fin > inicio
            else return medio;                                // fin > medio > inicio
        }
    }
    
    if (inicio < fin) {
        const medio = Math.floor((inicio + fin) / 2);
        
        // ENCONTRAR MEDIANA y moverla al final
        const indicePivot = medianaDeTres(arr, inicio, medio, fin);
        [arr[indicePivot], arr[fin]] = [arr[fin], arr[indicePivot]];
        
        const nuevoPivot = partition(arr, inicio, fin);
        quickSortMedianaDeTres(arr, inicio, nuevoPivot - 1);
        quickSortMedianaDeTres(arr, nuevoPivot + 1, fin);
    }
    return arr;
}

// ===================================================================
// EJEMPLOS DE USO Y COMPARACIONES
// ===================================================================

console.log("🚀 EJEMPLOS DE QUICK SORT");
console.log("═".repeat(60));

// Ejemplo 1: Caso básico
console.log("\n1️⃣ EJEMPLO BÁSICO:");
const numeros = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numeros);
console.log("Ordenado:", quickSort([...numeros]));

// Ejemplo 2: Con explicación paso a paso
console.log("\n2️⃣ EJEMPLO CON PASOS DETALLADOS:");
const numerosConPasos = [5, 2, 8, 1, 9];
console.log("═".repeat(50));
quickSortConPasos([...numerosConPasos]);

// Ejemplo 3: Versión iterativa
console.log("\n3️⃣ VERSIÓN ITERATIVA:");
const numerosIterativo = [7, 3, 1, 9, 4];
console.log("Original:", numerosIterativo);
console.log("═".repeat(30));
quickSortIterativo([...numerosIterativo]);

// Ejemplo 4: Diferentes estrategias de pivot
console.log("\n4️⃣ COMPARACIÓN DE ESTRATEGIAS DE PIVOT:");
const arrayPrueba = [9, 7, 5, 11, 12, 2, 14, 3, 10, 6];
console.log("Array original:", arrayPrueba);

console.log("\n📍 Último elemento como pivot:");
console.log("Resultado:", quickSort([...arrayPrueba]));

console.log("\n📍 Primer elemento como pivot:");
console.log("Resultado:", quickSortPrimerElemento([...arrayPrueba]));

console.log("\n📍 Elemento del medio como pivot:");
console.log("Resultado:", quickSortElementoMedio([...arrayPrueba]));

console.log("\n📍 Mediana de tres como pivot:");
console.log("Resultado:", quickSortMedianaDeTres([...arrayPrueba]));

// Ejemplo 5: Casos especiales
console.log("\n5️⃣ CASOS ESPECIALES:");
console.log("Array vacío:", quickSort([]));
console.log("Un elemento:", quickSort([42]));
console.log("Ya ordenado:", quickSort([1, 2, 3, 4, 5]));
console.log("Ordenado inverso:", quickSort([5, 4, 3, 2, 1]));
console.log("Elementos duplicados:", quickSort([3, 1, 4, 1, 5, 9, 2, 6, 5]));

// ===================================================================
// ANÁLISIS DE RENDIMIENTO
// ===================================================================

function analizarRendimientoQuickSort() {
    console.log("\n📊 ANÁLISIS DE RENDIMIENTO:");
    console.log("═".repeat(40));
    
    const tamaños = [1000, 10000, 50000];
    
    tamaños.forEach(tamaño => {
        console.log(`\n🔍 Probando con ${tamaño} elementos:`);
        
        // CASO PROMEDIO: Array aleatorio
        const arrAleatorio = Array.from({length: tamaño}, () => Math.floor(Math.random() * 1000));
        let inicio = performance.now();
        quickSort([...arrAleatorio]);
        let fin = performance.now();
        console.log(`  Aleatorio: ${(fin - inicio).toFixed(2)} ms`);
        
        // MEJOR CASO: Array ya ordenado (para mediana de tres)
        const arrOrdenado = Array.from({length: tamaño}, (_, i) => i);
        inicio = performance.now();
        quickSortMedianaDeTres([...arrOrdenado]);
        fin = performance.now();
        console.log(`  Ya ordenado (mediana): ${(fin - inicio).toFixed(2)} ms`);
        
        // PEOR CASO: Array ordenado con último elemento como pivot
        inicio = performance.now();
        quickSort([...arrOrdenado]);
        fin = performance.now();
        console.log(`  Ya ordenado (último pivot): ${(fin - inicio).toFixed(2)} ms`);
    });
}

analizarRendimientoQuickSort();

// ===================================================================
// COMPARACIÓN CON OTROS ALGORITMOS
// ===================================================================

console.log("\n🆚 COMPARACIÓN DE ALGORITMOS:");
console.log("═".repeat(40));

const arrayComparacion = Array.from({length: 10000}, () => Math.floor(Math.random() * 1000));

// Quick Sort
let inicio = performance.now();
quickSort([...arrayComparacion]);
let fin = performance.now();
console.log(`Quick Sort: ${(fin - inicio).toFixed(2)} ms`);

// Array.sort() nativo
inicio = performance.now();
[...arrayComparacion].sort((a, b) => a - b);
fin = performance.now();
console.log(`Array.sort(): ${(fin - inicio).toFixed(2)} ms`);

// ===================================================================
// VENTAJAS Y DESVENTAJAS
// ===================================================================

console.log("\n✅ VENTAJAS DEL QUICK SORT:");
console.log("• Muy eficiente en promedio: O(n log n)");
console.log("• Ordena in-place (usa poca memoria extra)");
console.log("• Divide y vencerás: paralelizable");
console.log("• Cache-friendly: accede a memoria de forma local");
console.log("• Funciona bien con diferentes tipos de datos");

console.log("\n❌ DESVENTAJAS DEL QUICK SORT:");
console.log("• Peor caso O(n²) con pivots mal elegidos");
console.log("• No es estable (puede cambiar orden de elementos iguales)");
console.log("• Rendimiento depende de la elección del pivot");
console.log("• Usa recursión (puede causar stack overflow en arrays muy grandes)");
console.log("• Sensible al estado inicial de los datos");

console.log("\n💡 CONSEJOS PARA OPTIMIZAR:");
console.log("• Usar mediana de tres para elegir pivot");
console.log("• Cambiar a insertion sort para subarrays pequeños (< 10 elementos)");
console.log("• Usar versión iterativa para arrays muy grandes");
console.log("• Implementar detección de arrays ya ordenados");