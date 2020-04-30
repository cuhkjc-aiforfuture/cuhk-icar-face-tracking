/**
 * CUHK iCar Experiment 01
 * 
 * Comparison Between Face Recognition And Ultrasonic Sensor
 * 
 * The CUHK iCar moves by using ultrasonic sensor or follows any faces that you want by face recognition function
 */
function Face_Following_Mode () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        xcenter = huskylens.readeBox(1, Content1.xCenter)
        if (xcenter < 80) {
            Turn_Left()
        }
        if (xcenter >= 80 && xcenter <= 240) {
            Move_Forward()
        }
        if (xcenter > 240) {
            Turn_Right()
        }
    } else {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Stop, 0)
    }
}
function Ultrasonic_Sensor_Mode () {
    if (mbit_Robot.Ultrasonic_Car() >= 1 && mbit_Robot.Ultrasonic_Car() <= 15) {
        Move_Forward()
    } else {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Stop, 0)
    }
}
function Turn_Right () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinRight, 60)
}
function Turn_Left () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinLeft, 60)
}
function Move_Forward () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 60)
}
input.onButtonPressed(Button.B, function () {
    mode = 2
    basic.showNumber(2)
})
input.onButtonPressed(Button.A, function () {
    mode = 1
    basic.showNumber(1)
})
let xcenter = 0
let mode = 0
mode = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (mode == 1) {
        Face_Following_Mode()
    }
    if (mode == 2) {
        Ultrasonic_Sensor_Mode()
    }
})
