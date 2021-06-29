export const DefaultStore: StoreModel = {
    0: {
        "faceRight": true,
        "spots": {
            0: {
                available: true,
                startTime: 0,
                plateNumber: "",
            },
            1: {
                available: true,
                startTime: 0,
                plateNumber: "",
            },
            2: {
                available: true,
                startTime: 0,
                plateNumber: "",
            },
            3: {
                available: true,
                startTime: 0,
                plateNumber: "",
            },
            4: {
                available: true,
                startTime: 0,
                plateNumber: "",
            }
        }
    },
    1: {
        "faceRight": false,
        "spots": {
            0: {
                available: true,
                startTime: 0,
                plateNumber: "",
            },
            1: {
                available: true,
                startTime: 0,
                plateNumber: "",
            },
            2: {
                available: true,
                startTime: 0,
                plateNumber: "",
            },
            3: {
                available: true,
                startTime: 0,
                plateNumber: "",
            },
            4: {
                available: true,
                startTime: 0,
                plateNumber: "",
            }
        }
    },
};


export interface StoreModel {
    [columnNumber: number]: ColumnData;
}

export interface ColumnData {
    faceRight: boolean;
    spots: {
        [spotNumber: number]: {
            available: boolean;
            startTime: number;
            plateNumber: string;
        }
    }
}