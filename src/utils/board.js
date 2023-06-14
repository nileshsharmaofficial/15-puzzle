const getX = index => Math.floor(index / 4)
const getY = index => index % 4
const getUp = index => getX(index) != 0 ? index - 4 : null
const getDown = index => getX(index) != 3 ? index + 4 : null
const getLeft = index => getY(index) != 0 ? index - 1 : null
const getRight = index => getY(index) != 3 ? index + 1 : null

export const moveTile = (board, moving_tile) => {
  if (moving_tile == null) {
    return board
  }
  board.tiles[board.empty].value = board.tiles[moving_tile].value
  board.tiles[moving_tile].value = 16
  board.empty = moving_tile
  return board
}

export const generateBoard = () => {
  const array = []
  for (let i = 0; i < 16; i++) {
    array.push({
      index: i,
      value: i+1,
      coords: {
        x: getX(i), 
        y: getY(i)
      },
      adjacent: {
        up: getUp(i), 
        down: getDown(i), 
        left: getLeft(i), 
        right: getRight(i)
      }
    })
  }
  const board = {
    tiles: array,
    empty: 15,
    gameover: false
  }
  return board
}

export const shuffleBoard = (board) => {
  for (let i = 0; i < 1000; i++) {
    const empty_tile_neighbours = board.tiles[board.empty].adjacent
    const movable_tiles = Object.values(empty_tile_neighbours).filter(value => value !== null)
    const random_movable_tile = movable_tiles[Math.floor(Math.random() * movable_tiles.length)]
    board = moveTile(board, random_movable_tile)
  }
  return board
}

export const checkCorrect = (num, index) => {
  return num - 1 == index
}
export const checkGameOver = (board) => {
  for (let i = 0; i < board.tiles.length; i++) {
    if (!checkCorrect(board.tiles[i].value, i)) {
      return false
    }
  }
  return true
}
