export interface SpotModel {
    columnNumber: number,
    spotNumber: number,
    spotData: SpotDataModel,
}

export interface SpotDataModel {
    available: boolean,
    plateNumber: string,
    startTime: number,
}