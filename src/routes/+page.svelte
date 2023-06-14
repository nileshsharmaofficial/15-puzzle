<script>
  import '../scss/app.scss';
  import { moveTile, generateBoard, shuffleBoard, checkCorrect, checkGameOver } from '../utils/board'

  let board = generateBoard()
  board = shuffleBoard(board)
  $: board.gameover = checkGameOver(board)
  $: console.log(board)

  const handleNewGame = () => {
    board = generateBoard()
    board = shuffleBoard(board)
  }

  const handleClick = (tile) => {
    if (board.gameover) {
      return
    }
    if (Object.values(board.tiles[board.empty].adjacent).includes(tile)) {
      board = moveTile(board, tile)
    }
  }
  const handleUp = () => {
    board = moveTile(board, board.tiles[board.empty].adjacent.down)
  }
  const handleDown = () => {
    board = moveTile(board, board.tiles[board.empty].adjacent.up)
  }
  const handleLeft = () => {
    board = moveTile(board, board.tiles[board.empty].adjacent.right)
  }
  const handleRight = () => {
    board = moveTile(board, board.tiles[board.empty].adjacent.left)
  }

  const onKeyDown = (e) => {
    if (board.gameover) {
      return
    }
    switch (e.keyCode) {
      case 38: // up
        handleUp()
        break
      case 40: // down
        handleDown()
        break
      case 37: // left
        handleLeft()
        break
      case 39: // right
        handleRight()
        break
    }
  }
</script>

<main>
  <div class="board">
    {#each Array(16) as _}
      <div class="cell"></div>
    {/each}
    {#each board.tiles as tile, i}
      {#if tile.value != 16}
        <button class={`no-btn-styles tile tile-${i} ${checkCorrect(tile.value, i) ? 'correct' : ''}`} on:click={() => handleClick(i)}>{tile.value}</button>
      {/if}
    {/each}
  </div>
  <button class="btn-primary" on:click={handleNewGame}>
    {#if board.gameover}
      You Won!
    {:else}
      New Game
    {/if}
  </button>
</main>

<svelte:window on:keydown|preventDefault={onKeyDown} />
