import {
    createWorld,
    pipe,
} from 'bitecs'

const otherSystem = (world: any) => {
    const { time: { delta } } = world
    console.log(delta)
}

const timeSystem = (world: any) => {
    const { time } = world
    const now = performance.now()
    const delta = now - time.then
    time.delta = delta
    time.elapsed += delta
    time.then = now
    return world
}

const pipeline = pipe(otherSystem, timeSystem)

const world: any = createWorld()
world.time = { 
    delta: 0, 
    elapsed: 0, 
    then: performance.now() 
}

setInterval(() => {
    pipeline(world)
}, 200)