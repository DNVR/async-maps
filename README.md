# Async Maps

An async version of JavaScript Maps.

## Install
```
npm install @dnvr/async-maps
```

## How it works

Async Maps work similar to JavaScript Maps and is in fact based on it.

It is a bit more restricive than regular Maps in that it offers no options to check for keys or delete or clear the Map. A value can only be set once for a given key and subsequent uses of the `set` method would be ineffective.

It allows using primitives as keys unlike with WeakMaps.

With Async Maps `get`ting the value corresponding to a key returns a Promise that resolves to the value when it is `set`.

## Usage
```TS
import AsyncMap from '@dnvr/async-maps'

const map = new AsyncMap

map.get( 'info' ).then( ( information ) => {
  console.log( information )
})

void async function () {
  let value = await map.get( 'value' )

  console.log( value )
}()

map.set( 'info', 'Hello World!!!' )
map.set( 'value', 1 )
```

