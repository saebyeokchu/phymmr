export enum ImageUploadStatusEnum {
    wait = 'wait',
    uploading = 'uploading',
    uploaded = 'uploaded',
    done = 'done'
}

export enum ImageMovingStateEnum {
    wait = 'wait',
    moving = 'moving'
}

export enum ImageRatioEnum {
    origin  = 'origin',
    custom = 'custom'
}

export enum DrawStateEnum {
    wait = 'wait',
    drawing = 'drawing'
}

export enum DragStateEnum {
    wait = 'wait',
    start = 'start',
    end = 'end'
}

export enum PaperStateEnum {
    lock = 'lock',
    unlock = 'unlock'
}

export enum BlockDivStateEnum {
    alreadyFilled = 'alreadyFilled',
    willColorChange  = 'willColorChange',
    empty  = 'empty'
}

export enum ActionToolEnum {
    draw  = 'draw',
    erase = 'erase'
}



export enum Direction {
    up  = 'up',
    down  = 'down',
    left   = 'left',
    right  = 'right'
}
