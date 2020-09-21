const key2promise: unique symbol = Symbol()
const promise2resolver: unique symbol = Symbol()

class AsyncMap<K = any, V = any> {
  private [ key2promise ]: Map<K, Promise<V>>
  private [ promise2resolver ]: WeakMap<Promise<V>, ( value: V ) => void>

  public constructor ( iterable?: Iterable<[ K, V ]> ) {
    this[ key2promise ] = new Map
    this[ promise2resolver ] = new WeakMap

    if ( 'undefined' !== typeof iterable ) {
      for ( let entry of iterable ) {
        let [ key, value ] = entry

        this.set( key, value )
      }
    }
  }

  public get ( key: K ): Promise<V> {
    if ( this[ key2promise ].has( key ) ) {
      return this[ key2promise ].get( key ) as Promise<V>
    }
    else {
      let resolve: ( value: V ) => void
      let promise = new Promise( function ( resolution: ( value: V ) => void ) {
        resolve = resolution
      } )


      this[ key2promise ].set( key, promise )

      this[ promise2resolver ].set( promise, resolve )

      return promise
    }
  }

  public set ( key: K, value: V ) {
    this[ promise2resolver ].get( this.get( key ) )( value )
  }
}

export default AsyncMap