bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
function retrieveData (data: number, prd: number) {
    currentTime = control.millis()
    if (counter == 0) {
        startTime = control.millis()
        counter = 1
    }
    if (currentTime - startTime > prd) {
        bluetooth.uartWriteNumber(data)
        counter = 0
    }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Comma), function () {
    period = 1000 * parseFloat(bluetooth.uartReadUntil(serial.delimiters(Delimiters.Comma)))
})
let startTime = 0
let currentTime = 0
let counter = 0
let period = 0
bluetooth.startUartService()
basic.showIcon(IconNames.No)
period = 2000
counter = 0
basic.forever(function () {
    retrieveData(input.lightLevel(), period)
})
