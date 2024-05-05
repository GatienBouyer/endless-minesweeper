<script lang="ts">
    import { onMount } from "svelte";
    import { game, gameStorage } from "$states/game.svelte";
    import { longclick as longClick } from "$lib/actions/long_click";
    import Zoom from "$app_components/Zoom.svelte";
    import Scrollable4Dir from "$app_components/Scrollable4Dir.svelte";
    import MinesweeperCell from "$app_components/MinesweeperCell";
    import removeItem from "$lib/remove_item";

    function clear() {
        gridDiv.textContent = "";
        zoom.reset();
        scrollable4Dir.reset();
        maxX = 0;
        maxY = 0;
    }

    let zoom: Zoom;
    let scrollable4Dir: Scrollable4Dir;
    let gridDiv: HTMLDivElement;
    let maxX = $state(0);
    let maxY = $state(0);
    let scale: number = $state(1);
    let translateX: number = $state(0);
    let translateY: number = $state(0);

    function createCell(x: number, y: number) {
        const cell = document.createElement("minesweeper-cell");
        cell.x = x;
        cell.y = y;
        cell.render();
        gridDiv.appendChild(cell);
        if (x > maxX) {
            maxX = x;
        }
        if (y > maxY) {
            maxY = y;
        }
    }

    function updateCell(x: number, y: number) {
        for (const cell of gridDiv.children) {
            // @ts-expect-error if x or y is undefined the condition stays correct
            if (cell.x == x && cell.y == y) {
                // @ts-expect-error error should be raised as default
                // As x and y were defined, cell is expected to be a MinesweeperCell.
                cell.render();
            }
        }
    }

    function onShortClick(e: MouseEvent | TouchEvent) {
        const cell = e.target as MinesweeperCell;
        if (!("x" in cell && "y" in cell)) {
            return;
        }
        if (game.isDigit(cell.x, cell.y)) {
            game.autoReveal(cell.x, cell.y);
        } else {
            game.toggleFlag(cell.x, cell.y);
        }
        gameStorage.save(game.toJSON());
    }

    function onLongClick(e: MouseEvent | TouchEvent) {
        const cell = e.target as MinesweeperCell;
        if (!("x" in cell && "y" in cell)) {
            return;
        }
        game.revealCell(cell.x, cell.y);
        gameStorage.save(game.toJSON());
    }

    onMount(() => {
        game.listenersExpand.push(createCell);
        game.listenersClear.push(clear);
        game.listenersUpdate.push(updateCell);
        game.start();
        return () => {
            removeItem(game.listenersExpand, createCell);
            removeItem(game.listenersClear, clear);
            removeItem(game.listenersUpdate, updateCell);
        };
    });
</script>

<Scrollable4Dir
    bind:this={scrollable4Dir}
    margin_bottom={`calc(${maxY * scale} * 2em + 60vh + ${translateY}px)`}
    margin_right={`calc(${maxX * scale} * 2em + 60vw + ${translateX}px)`}
>
    <Zoom bind:this={zoom} bind:scale bind:translateX bind:translateY>
        <div
            style:--detailsDisplay={scale < 0.5 ? "none" : "unset"}
            bind:this={gridDiv}
            use:longClick={{ onLong: onLongClick, onShort: onShortClick }}
        ></div>
    </Zoom>
</Scrollable4Dir>
