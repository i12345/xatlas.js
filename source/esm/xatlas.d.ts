export interface ChartOptions {
    maxIterations: number;
    straightnessWeight: number;
    textureSeamWeight: number;
    maxChartArea: number;
    normalDeviationWeight: number;
    roundnessWeight: number;
    maxCost: number;
    maxBoundaryLength: number;
    normalSeamWeight: number;
}

export interface PackOptions {
    maxChartSize: number;
    padding: number;
    bilinear: boolean;
    createImage: boolean;
    blockAlign: boolean;
    resolution: number;
    bruteForce: boolean;
    texelsPerUnit: number;
}

export class XAtlasAPI{

    /**
     * @param onLoad {() => void}
     * @param locateFile {(path: string, dir: string) => string} - should return path for xatlas.wasm, default is root of domain
     * @param onAtlasProgress {Function} - called on progress update with mode {ProgressCategory} and counter
     */
    constructor(onLoad: () => void, locateFile: (path: string, dir: string) => string, onAtlasProgress: Function)

    moduleLoaded(mod: unknown): void

    createAtlas(): void

    /**
     *
     * @param indexes {Uint16Array}
     * @param vertices {Float32Array}
     * @param normals {Float32Array}
     * @param coords {Float32Array}
     * @param meshObj {any}
     * @param useNormals {boolean}
     * @param useCoords {boolean}
     * @param scale {number|[number, number, number]}
     * @return {null | {indexes: (Float32Array | null), vertices: Float32Array, normals: (Float32Array | null), meshId: number, coords: (Float32Array | null), meshObj: any}}
     */
    addMesh(indexes: Uint16Array, vertices: Float32Array, normals?: Float32Array, coords?: Float32Array, meshObj?: any, useNormals?: boolean, useCoords?: boolean, scale?: number | [number, number, number]): null | { indexes: (Float32Array | null); vertices: Float32Array; normals: (Float32Array | null); meshId: number; coords: (Float32Array | null); meshObj: any; }

    createMesh(vertexCount: number, indexCount: number, normals: boolean, coords: boolean): { meshId: number; indexOffset: number; positionOffset: number; normalOffset: number; uvOffset: number; meshObj: any; }

    // createUvMesh(vertexCount, indexCount){
    //     return this.xatlas.createUvMesh(vertexCount, indexCount);
    // }

    /**
     * Result in coords1, input coords in coords
     * @param chartOptions {{maxIterations: number, straightnessWeight: number, textureSeamWeight: number, maxChartArea: number, normalDeviationWeight: number, roundnessWeight: number, maxCost: number, maxBoundaryLength: number, normalSeamWeight: number}}
     * @param packOptions {{maxChartSize: number, padding: number, bilinear: boolean, createImage: boolean, blockAlign: boolean, resolution: number, bruteForce: boolean, texelsPerUnit: number}}
     * @param returnMeshes {boolean} - default = true
     * @return {{vertex: {vertices: Float32Array, coords1: Float32Array, normals?: Float32Array, coords?: Float32Array}, index: Uint16Array, mesh: any}[]}
     */
    generateAtlas(chartOptions: ChartOptions, packOptions: PackOptions, returnMeshes?: boolean): { vertex: { vertices: Float32Array; coords1: Float32Array; normals?: Float32Array; coords?: Float32Array; }; index: Uint16Array; mesh: any; }[]
    
    defaultChartOptions(): ChartOptions

    defaultPackOptions(): PackOptions

    setProgressLogging(flag: boolean): void

    getMeshData(meshId: number): { newVertexCount: number; newIndexCount: number; indexOffset: number; originalIndexOffset: number; uvOffset: number; }

    destroyMeshData(data: { newVertexCount: number; newIndexCount: number; indexOffset: number; originalIndexOffset: number; uvOffset: number; }): any

    destroyAtlas(): void

}