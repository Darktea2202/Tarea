// ===================================================================
// ALGORITMO DE ORDENAMIENTO: BUBBLE SORT
// ===================================================================

/**
 * Bubble Sort - Ordenamiento Burbuja
 * 
 * FUNCIONAMIENTO (Como burbujas que suben a la superficie):
 * 1. Compara pares de elementos adyacentes
 * 2. Si están en orden incorrecto, los intercambia
 * 3. Repite el proceso recorriendo todo el array
 * 4. En cada pasada, el elemento más grande "burbujea" hacia el final
 * 5. Continúa hasta que no se necesiten más intercambios
 * 
 * COMPLEJIDAD:
 * - Mejor caso: O(n) - cuando el array ya está ordenado (versión optimizada)
 * - Caso promedio: O(n²)
 * - Peor caso: O(n²) - cuando el array está ordenado en reversa
 * - Espacio: O(1) - ordena in-place
 */

// ===================================================================
// IMPLEMENTACIÓN BÁSICA
// ===================================================================

function bubbleSort(arr) {
    const n = arr.length; // Guardamos la longitud para evitar cálculos repetidos
    
    // BUCLE EXTERNO: Controla el número de pasadas
    // Necesitamos n-1 pasadas para garantizar que todo esté ordenado
    for (let i = 0; i < n - 1; i++) {
        
        // BUCLE INTERNO: Compara elementos adyacentes
        // En cada pasada, el último elemento ya está en su posición correcta
        // Por eso usamos (n - 1 - i) para reducir comparaciones innecesarias
        for (let j = 0; j < n - 1 - i; j++) {
            
            // COMPARACIÓN: Si el elemento actual es mayor que el siguiente
            if (arr[j] > arr[j + 1]) {
                
                // INTERCAMBIO: Usamos destructuring para intercambiar elementos
                // Esta es la "burbuja" subiendo: el elemento mayor se mueve hacia el final
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        
        // DESPUÉS DE CADA PASADA:
        // El elemento más grande de la parte no ordenada está ahora en su posición final
        // Los últimos (i + 1) elementos están correctamente ordenados
    }
    
    return arr; // Retornamos el array completamente ordenado
}

// ===================================================================
// VERSIÓN CON EXPLICACIÓN PASO A PASO
// ===================================================================

function bubbleSortConPasos(arr) {
    console.log("🫧 ARRAY INICIAL:", arr);
    console.log("═".repeat(60));
    console.log("💡 Concepto: Los elementos grandes 'burbujean' hacia el final\n");
    
    const n = arr.length;
    let totalIntercambios = 0; // Contador para estadísticas
    
    // BUCLE DE PASADAS: Cada pasada mueve un elemento a su posición final
    for (let i = 0; i < n - 1; i++) {
        
        console.log(`🔄 PASADA ${i + 1}:`);
        console.log(`📍 Buscando el ${i + 1}° elemento más grande`);
        
        let intercambiosEnPasada = 0; // Contador para esta pasada específica
        
        // BUCLE DE COMPARACIONES: Comparamos elementos adyacentes
        for (let j = 0; j < n - 1 - i; j++) {
            
            // MOSTRAR COMPARACIÓN ACTUAL
            console.log(`  🔍 Comparando ${arr[j]} y ${arr[j + 1]} (posiciones ${j} y ${j + 1})`);
            
            // DECISIÓN DE INTERCAMBIO
            if (arr[j] > arr[j + 1]) {
                
                console.log(`    ↔️ ${arr[j]} > ${arr[j + 1]}, intercambiando...`);
                
                // INTERCAMBIO CON EXPLICACIÓN
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                intercambiosEnPasada++;
                totalIntercambios++;
                
                // MOSTRAR RESULTADO DEL INTERCAMBIO
                console.log(`    ✅ Resultado: [${arr.join(', ')}]`);
                
            } else {
                console.log(`    ✅ ${arr[j]} ≤ ${arr[j + 1]}, ya están en orden correcto`);
            }
        }
        
        // RESUMEN DE LA PASADA
        const elementoColocado = arr[n - 1 - i];
        console.log(`  🎯 Elemento ${elementoColocado} colocado en posición final ${n - 1 - i}`);
        console.log(`  📊 Intercambios en esta pasada: ${intercambiosEnPasada}`);
        console.log(`  🏁 Estado después de pasada ${i + 1}: [${arr.join(', ')}]`);
        
        // MOSTRAR PROGRESO VISUAL
        const parteOrdenada = arr.slice(n - 1 - i);
        const parteNoOrdenada = arr.slice(0, n - 1 - i);
        console.log(`  📈 Parte no ordenada: [${parteNoOrdenada.join(', ')}]`);
        console.log(`  ✅ Parte ordenada: [${parteOrdenada.join(', ')}]`);
        console.log("─".repeat(50));
    }
    
    console.log(`🎉 ARRAY FINAL ORDENADO: [${arr.join(', ')}]`);
    console.log(`📊 Total de intercambios realizados: ${totalIntercambios}`);
    return arr;
}

// ===================================================================
// VERSIÓN OPTIMIZADA (DETECTA ARRAYS YA ORDENADOS)
// ===================================================================

function bubbleSortOptimizado(arr) {
    const n = arr.length;
    
    // BUCLE DE PASADAS con posibilidad de terminación temprana
    for (let i = 0; i < n - 1; i++) {
        
        // BANDERA DE OPTIMIZACIÓN: Detecta si el array ya está ordenado
        let huboCambios = false;
        
        // BUCLE DE COMPARACIONES
        for (let j = 0; j < n - 1 - i; j++) {
            
            if (arr[j] > arr[j + 1]) {
                // INTERCAMBIO Y MARCAMOS QUE HUBO CAMBIOS
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                huboCambios = true; // Indicamos que se realizó al menos un intercambio
            }
        }
        
        // OPTIMIZACIÓN: Si no hubo intercambios, el array ya está ordenado
        if (!huboCambios) {
            console.log(`✨ Optimización: Array ordenado después de ${i + 1} pasada(s)`);
            break; // Terminamos el algoritmo tempranamente
        }
    }
    
    return arr;
}

// ===================================================================
// VERSIÓN BIDIRECCIONAL (COCKTAIL SHAKER SORT)
// ===================================================================

function cocktailShakerSort(arr) {
    console.log("🍸 Cocktail Shaker Sort (Bubble Sort bidireccional)");
    console.log("💡 Burbujea en ambas direcciones en cada pasada");
    
    let inicio = 0;
    let fin = arr.length - 1;
    let huboCambios = true;
    
    while (huboCambios) {
        huboCambios = false;
        
        // PASADA HACIA LA DERECHA: Mueve el mayor hacia el final
        console.log(`➡️ Pasada hacia la derecha (${inicio} → ${fin})`);
        for (let i = inicio; i < fin; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                huboCambios = true;
                console.log(`  ↔️ Intercambio: [${arr.join(', ')}]`);
            }
        }
        
        // Si no hubo cambios en la primera dirección, ya está ordenado
        if (!huboCambios) break;
        
        // REDUCIR EL RANGO: El último elemento ya está en su lugar
        fin--;
        huboCambios = false;
        
        // PASADA HACIA LA IZQUIERDA: Mueve el menor hacia el inicio
        console.log(`⬅️ Pasada hacia la izquierda (${fin} → ${inicio})`);
        for (let i = fin; i > inicio; i--) {
            if (arr[i] < arr[i - 1]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                huboCambios = true;
                console.log(`  ↔️ Intercambio: [${arr.join(', ')}]`);
            }
        }
        
        // REDUCIR EL RANGO: El primer elemento ya está en su lugar
        inicio++;
        
        console.log(`📊 Rango actual: [${inicio}..${fin}]`);
        console.log("─".repeat(30));
    }
    
    return arr;
}

// ===================================================================
// VERSIONES PARA DIFERENTES TIPOS DE DATOS
// ===================================================================

// BUBBLE SORT PARA STRINGS
function bubbleSortStrings(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            
            // COMPARACIÓN LEXICOGRÁFICA: JavaScript compara strings alfabéticamente
            if (arr[j].localeCompare(arr[j + 1]) > 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// BUBBLE SORT PARA OBJETOS
function bubbleSortObjetos(arr, propiedad) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            
            // COMPARACIÓN POR PROPIEDAD: Accedemos a la propiedad específica
            if (arr[j][propiedad] > arr[j + 1][propiedad]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// BUBBLE SORT DESCENDENTE
function bubbleSortDescendente(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            
            // COMPARACIÓN INVERSA: Buscamos elementos menores para intercambiar
            if (arr[j] < arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// ===================================================================
// VERSIÓN CON FUNCIÓN DE COMPARACIÓN PERSONALIZADA
// ===================================================================

function bubbleSortConComparador(arr, funcionComparacion) {
    const n = arr.length;
    
    // FUNCIÓN DE COMPARACIÓN: Similar a Array.sort()
    // Retorna: negativo si a < b, positivo si a > b, cero si a === b
    const comparar = funcionComparacion || ((a, b) => a - b);
    
    for (let i = 0; i < n - 1; i++) {
        let huboCambios = false;
        
        for (let j = 0; j < n - 1 - i; j++) {
            
            // USAR FUNCIÓN DE COMPARACIÓN PERSONALIZADA
            if (comparar(arr[j], arr[j + 1]) > 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                huboCambios = true;
            }
        }
        
        if (!huboCambios) break; // Optimización
    }
    
    return arr;
}

// ===================================================================
// EJEMPLOS DE USO
// ===================================================================

console.log("🫧 EJEMPLOS DE BUBBLE SORT");
console.log("═".repeat(60));

// Ejemplo 1: Caso básico con números
console.log("\n1️⃣ EJEMPLO BÁSICO:");
const numeros = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numeros);
console.log("Ordenado:", bubbleSort([...numeros]));

// Ejemplo 2: Con explicación paso a paso
console.log("\n2️⃣ EJEMPLO CON PASOS DETALLADOS:");
const numerosConPasos = [5, 2, 8, 1];
bubbleSortConPasos([...numerosConPasos]);

// Ejemplo 3: Versión optimizada
console.log("\n3️⃣ VERSIÓN OPTIMIZADA (Array casi ordenado):");
const numerosOptimizado = [1, 2, 3, 5, 4]; // Solo 4 y 5 están intercambiados
console.log("Original:", numerosOptimizado);
console.log("Resultado:", bubbleSortOptimizado([...numerosOptimizado]));

// Ejemplo 4: Cocktail Shaker Sort
console.log("\n4️⃣ COCKTAIL SHAKER SORT:");
const numerosCocktail = [6, 3, 8, 2, 9, 1];
console.log("Original:", numerosCocktail);
cocktailShakerSort([...numerosCocktail]);

// Ejemplo 5: Ordenamiento de strings
console.log("\n5️⃣ ORDENAMIENTO DE STRINGS:");
const nombres = ["Carlos", "Ana", "Luis", "Beatriz", "David"];
console.log("Original:", nombres);
console.log("Ordenado:", bubbleSortStrings([...nombres]));

// Ejemplo 6: Ordenamiento de objetos
console.log("\n6️⃣ ORDENAMIENTO DE OBJETOS:");
const estudiantes = [
    { nombre: "Juan", edad: 20, calificacion: 85 },
    { nombre: "María", edad: 18, calificacion: 92 },
    { nombre: "Pedro", edad: 22, calificacion: 78 },
    { nombre: "Ana", edad: 19, calificacion: 96 }
];
console.log("Original:", estudiantes);
console.log("Por edad:", bubbleSortObjetos([...estudiantes], 'edad'));
console.log("Por calificación:", bubbleSortObjetos([...estudiantes], 'calificacion'));

// Ejemplo 7: Ordenamiento descendente
console.log("\n7️⃣ ORDENAMIENTO DESCENDENTE:");
const numerosDesc = [3, 7, 1, 9, 4];
console.log("Original:", numerosDesc);
console.log("Descendente:", bubbleSortDescendente([...numerosDesc]));

// Ejemplo 8: Con función de comparación personalizada
console.log("\n8️⃣ COMPARACIÓN PERSONALIZADA:");
const palabras = ["apple", "pie", "a", "elephant"];
console.log("Original:", palabras);

// Ordenar por longitud de palabra
console.log("Por longitud:", bubbleSortConComparador([...palabras], (a, b) => a.length - b.length));

// Ordenar por última letra
console.log("Por última letra:", bubbleSortConComparador([...palabras], 
    (a, b) => a[a.length - 1].localeCompare(b[b.length - 1])));

// Ejemplo 9: Casos especiales
console.log("\n9️⃣ CASOS ESPECIALES:");
console.log("Array vacío:", bubbleSort([]));
console.log("Un elemento:", bubbleSort([42]));
console.log("Ya ordenado:", bubbleSort([1, 2, 3, 4, 5]));
console.log("Ordenado inverso:", bubbleSort([5, 4, 3, 2, 1]));
console.log("Elementos duplicados:", bubbleSort([3, 1, 4, 1, 5, 9, 2, 6, 5]));

// ===================================================================
// ANÁLISIS DE RENDIMIENTO
// ===================================================================

function analizarRendimientoBubble() {
    console.log("\n📊 ANÁLISIS DE RENDIMIENTO:");
    console.log("═".repeat(50));
    
    const tamaños = [100, 500, 1000, 2000];
    
    tamaños.forEach(tamaño => {
        console.log(`\n🔍 Probando con ${tamaño} elementos:`);
        
        // CASO PROMEDIO: Array aleatorio
        const arrAleatorio = Array.from({length: tamaño}, () => Math.floor(Math.random() * 1000));
        let inicio = performance.now();
        bubbleSort([...arrAleatorio]);
        let fin = performance.now();
        console.log(`  Aleatorio: ${(fin - inicio).toFixed(2)} ms`);
        
        // MEJOR CASO: Array ya ordenado con versión optimizada
        const arrOrdenado = Array.from({length: tamaño}, (_, i) => i);
        inicio = performance.now();
        bubbleSortOptimizado([...arrOrdenado]);
        fin = performance.now();
        console.log(`  Ya ordenado (optimizado): ${(fin - inicio).toFixed(2)} ms`);
        
        // PEOR CASO: Array ordenado en reversa
        const arrReversa = Array.from({length: tamaño}, (_, i) => tamaño - i);
        inicio = performance.now();
        bubbleSort([...arrReversa]);
        fin = performance.now();
        console.log(`  Reversa: ${(fin - inicio).toFixed(2)} ms`);
        
        // CASO CASI ORDENADO
        const arrCasiOrdenado = [...arrOrdenado];
        // Intercambiar algunos elementos
        for (let i = 0; i < tamaño * 0.05; i++) {
            const pos1 = Math.floor(Math.random() * tamaño);
            const pos2 = Math.floor(Math.random() * tamaño);
            [arrCasiOrdenado[pos1], arrCasiOrdenado[pos2]] = [arrCasiOrdenado[pos2], arrCasiOrdenado[pos1]];
        }
        inicio = performance.now();
        bubbleSortOptimizado([...arrCasiOrdenado]);
        fin = performance.now();
        console.log(`  Casi ordenado: ${(fin - inicio).toFixed(2)} ms`);
    });
}

analizarRendimientoBubble();

// ===================================================================
// COMPARACIÓN CON OTROS ALGORITMOS
// ===================================================================

console.log("\n🆚 COMPARACIÓN DE ALGORITMOS:");
console.log("═".repeat(40));

const arrayComparacion = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));

// Bubble Sort básico
let inicio = performance.now();
bubbleSort([...arrayComparacion]);
let fin = performance.now();
console.log(`Bubble Sort básico: ${(fin - inicio).toFixed(2)} ms`);

// Bubble Sort optimizado
inicio = performance.now();
bubbleSortOptimizado([...arrayComparacion]);
fin = performance.now();
console.log(`Bubble Sort optimizado: ${(fin - inicio).toFixed(2)} ms`);

// Cocktail Shaker Sort
inicio = performance.now();
cocktailShakerSort([...arrayComparacion]);
fin = performance.now();
console.log(`Cocktail Shaker Sort: ${(fin - inicio).toFixed(2)} ms`);

// Array.sort() nativo
inicio = performance.now();
[...arrayComparacion].sort((a, b) => a - b);
fin = performance.now();
console.log(`Array.sort() nativo: ${(fin - inicio).toFixed(2)} ms`);

// ===================================================================
// VISUALIZACIÓN DEL PROCESO
// ===================================================================

function visualizarBubbleSort(arr) {
    console.log("\n🎨 VISUALIZACIÓN DEL PROCESO:");
    console.log("═".repeat(40));
    
    const n = arr.length;
    const copia = [...arr];
    
    console.log(`📊 Array inicial: [${copia.join(', ')}]`);
    
    for (let i = 0; i < n - 1; i++) {
        console.log(`\n🔄 Pasada ${i + 1}:`);
        
        for (let j = 0; j < n - 1 - i; j++) {
            // CREAR REPRESENTACIÓN VISUAL
            const visual = copia.map((val, idx) => {
                if (idx === j) return `(${val})`;      // Elemento que estamos comparando
                if (idx === j + 1) return `[${val}]`; // Elemento con el que comparamos
                if (idx >= n - i) return `*${val}*`;  // Elementos ya ordenados
                return val.toString();
            });
            
            console.log(`  ${visual.join(' ')}`);
            
            if (copia[j] > copia[j + 1]) {
                [copia[j], copia[j + 1]] = [copia[j + 1], copia[j]];
                console.log(`  ↔️ Intercambio realizado`);
            } else {
                console.log(`  ✅ Ya en orden`);
            }
        }
        
        const finalVisual = copia.map((val, idx) => {
            if (idx >= n - 1 - i) return `*${val}*`; // Elementos ordenados
            return val.toString();
        }).join(' ');
        
        console.log(`  🏁 Final de pasada: ${finalVisual}`);
    }
    
    console.log(`\n🎉 Resultado final: [${copia.join(', ')}]`);
    return copia;
}

// Ejemplo de visualización
console.log("\n🎨 EJEMPLO DE VISUALIZACIÓN:");
visualizarBubbleSort([5, 2, 8, 1, 9]);

// ===================================================================
// VENTAJAS Y DESVENTAJAS
// ===================================================================

console.log("\n✅ VENTAJAS DEL BUBBLE SORT:");
console.log("• Implementación extremadamente simple");
console.log("• Fácil de entender y explicar");
console.log("• Es estable: mantiene orden relativo de elementos iguales");
console.log("• Ordena in-place: usa solo O(1) memoria extra");
console.log("• Detecta arrays ya ordenados (versión optimizada)");
console.log("• Funciona con cualquier tipo de datos comparables");
console.log("• Bueno para fines educativos");

console.log("\n❌ DESVENTAJAS DEL BUBBLE SORT:");
console.log("• Muy ineficiente: O(n²) en casi todos los casos");
console.log("• Muchos intercambios innecesarios");
console.log("• Muy lento para arrays grandes");
console.log("• No aprovecha estructuras de datos parcialmente ordenadas");
console.log("• Uno de los algoritmos de ordenamiento más lentos");

console.log("\n💼 CUÁNDO USAR BUBBLE SORT:");
console.log("• NUNCA en producción para arrays grandes");
console.log("• Para enseñar conceptos de ordenamiento");
console.log("• Arrays muy pequeños (< 10 elementos) donde la simplicidad importa más");
console.log("• Como ejercicio académico");
console.log("• Cuando necesitas el algoritmo más simple posible");

console.log("\n🔧 OPTIMIZACIONES POSIBLES:");
console.log("• Detección temprana de arrays ordenados");
console.log("• Bubble Sort bidireccional (Cocktail Shaker)");
console.log("• Reducir rango en cada pasada");
console.log("• Cambiar a algoritmos más eficientes para arrays grandes");

console.log("\n📚 VARIANTES IMPORTANTES:");
console.log("• Cocktail Shaker Sort: burbujea en ambas direcciones");
console.log("• Odd-even Sort: versión paralelizable");
console.log("• Bubble Sort adaptativo: se adapta a datos parcialmente ordenados");

console.log("\n🎓 VALOR EDUCATIVO:");
console.log("• Perfecto para entender conceptos de ordenamiento");
console.log("• Muestra claramente la complejidad O(n²)");
console.log("• Demuestra la importancia de optimizaciones");
console.log("• Base para entender algoritmos más complejos");