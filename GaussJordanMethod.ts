const array = [
  [1, 4, 9, 37],
  [2, 3, -2, 19],
  [5, -4, 3, 29]
]

// const array = [
//   [2, 3, 5, 17],
//   [2, 3, 2, 14],
//   [3, 6, 2, 23]
// ]

// const array = [
//   [2, 1, 6, 30],
//   [1, 1, 4, 20],
//   [3, 2, 2, 30],
// ]

class SolveByGaussJordan {
  private arrayCopy: number[][]
  private outputArray: number[][]
  private firstEquationSystem: number[]
  private secondEquationSystem: number[]
  private thiryEquationSystem: number[]

  constructor (array: number[][]) {
    this.arrayCopy = [...array]
    this.firstEquationSystem = this.arrayCopy[0]
    this.secondEquationSystem = this.arrayCopy[1]
    this.thiryEquationSystem = this.arrayCopy[2]
    this.outputArray = this.stepOne(this.arrayCopy)
    this.outputArray = this.stepTwo(this.outputArray)
    this.outputArray = this.stepThree(this.outputArray)
    this.outputArray = this.stepFour(this.outputArray)
    this.outputArray = this.stepFive(this.outputArray)
    this.outputArray = this.stepSix(this.outputArray)
  }

  private getZeroOperationValue (value: number) {
    return value * -1
  }

  private getOneOperationValue (value: number) {
    return value * 1
  }

  solve () {
    return this.outputArray
  }

  stepOne (array: number[][]): number[][] {
    const firstValue = array[0][0]
    if (firstValue == 1) return array

    let operationValue = this.getOneOperationValue(this.firstEquationSystem[0])
    for (let i = 0; i < this.firstEquationSystem.length; i++) {
      this.firstEquationSystem[i] = this.firstEquationSystem[i] / operationValue
    }

    return array
  }

  stepTwo (array: number[][]): number[][] {
    const secondEquationSystemOperationValue = this.getZeroOperationValue(this.secondEquationSystem[0])
    const thiryEquationSystemOperationValue = this.getZeroOperationValue(this.thiryEquationSystem[0])

    for (let i = 0; i < this.firstEquationSystem.length; i++) {
      const firstEquationSystemValue = this.firstEquationSystem[i]

      const ansOfSecondRow = (secondEquationSystemOperationValue * firstEquationSystemValue) + this.secondEquationSystem[i]
      this.secondEquationSystem[i] = ansOfSecondRow

      const ansOfThirdRow = (thiryEquationSystemOperationValue * firstEquationSystemValue) + this.thiryEquationSystem[i]
      this.thiryEquationSystem[i] = ansOfThirdRow
    }

    return array
  }

  stepThree (array: number[][]): number[][] {
    const operationValue = this.getOneOperationValue(this.secondEquationSystem[1])

    for (let i = 1; i < this.secondEquationSystem.length; i++) {
      this.secondEquationSystem[i] = this.secondEquationSystem[i] / operationValue
    }

    return array
  }

  stepFour (array: number[][]): number[][] {
    const firstEquationSystemOperationValue = this.getZeroOperationValue(this.firstEquationSystem[1])
    const thiryEquationSystemOperationValue = this.getZeroOperationValue(this.thiryEquationSystem[1])

    for (let i = 1; i < this.firstEquationSystem.length; i++) {
      const ansOfFirstRow = (firstEquationSystemOperationValue * this.secondEquationSystem[i]) + this.firstEquationSystem[i]
      this.firstEquationSystem[i] = ansOfFirstRow

      const ansOfThirdRow = (thiryEquationSystemOperationValue * this.secondEquationSystem[i]) + this.thiryEquationSystem[i]
      this.thiryEquationSystem[i] = ansOfThirdRow
    }

    return array
  }

  stepFive (array: number[][]): number[][] {
    const operationValue = this.getOneOperationValue(this.thiryEquationSystem[2])

    for (let i = 2; i < this.thiryEquationSystem.length; i++) {
      this.thiryEquationSystem[i] = this.thiryEquationSystem[i] / operationValue
    }

    return array
  }

  stepSix (array: number[][]): number[][] {
    let operationValue = this.getZeroOperationValue(this.firstEquationSystem[2])
    for (let i = 2; i < this.firstEquationSystem.length; i++) {
      const ans = (operationValue * this.thiryEquationSystem[i]) + this.firstEquationSystem[i]
      this.firstEquationSystem[i] = ans
    }

    operationValue = this.getZeroOperationValue(this.secondEquationSystem[2])
    for (let i = 2; i < this.secondEquationSystem.length; i++) {
      const ans = (operationValue * this.thiryEquationSystem[i]) + this.secondEquationSystem[i]
      this.secondEquationSystem[i] = ans
    }

    return array
  }
}

const solveByGaussJordan = new SolveByGaussJordan(array)
console.log(solveByGaussJordan.solve())
console.log(array)

/*
  expected output of first test

  [
    [1 0 0 7]
    [0 1 0 3]
    [0 0 1 2]
  ]

*/