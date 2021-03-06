# Extensions example

Here's a simple data set which would be common with data that comes from SQL
sources. Notice that it has foreign key relations in it: objects in `albums`
have the `artist_id` property that maps to the ID's in `artists`.

##### Sample data

<!-- {.file-heading} -->

```js
data =
  { artists:
    { 1: { id: 1, name: 'Ella Fitzgerald' },
      2: { id: 2, name: 'Frank Sinatra' },
      3: { id: 3, name: 'Miles Davis' },
      4: { id: 4, name: 'Taylor Swift' } },
    albums:
    { 1: { id: 1, name: 'Kind of Blue', genre: 'Jazz', artist_id: 3 },
      2: { id: 2, name: 'Come Fly With Me', genre: 'Jazz', artist_id: 2 },
      3: { id: 3, name: '1984', genre: 'Pop', artist_id: 4 } } }
```

## Defining extensions

You can define extensions to traverse this intelligently, like ActiveRecord.
Here, we'll use [use()](../README.md#use) to define extra methods that will
be applied to certain keypaths.

##### Models

<!-- {.file-heading} -->

```js
Root = {
  artists () { return this.go('artists') },
  albums () { return this.go('albums') }
}

Artist = {
  // Defines a has-many relationship
  albums () {
    return this.root.albums().filter({ artist_id: this.get('id') })
  }
}

Album = {
  // Defines a belongs-to relationship
  artist () {
    return this.root.artists().go(this.get('artist_id'))
  }
}
```

##### Using with scour

<!-- {.file-heading} -->

```js
db = scour(data)
  .use({
    '': Root,
    'artists.*': Artist,
    'albums.*': Album
  })
```

## Root extensions

With the extensions to the root (`''`), it defined an alias to `go('albums')`
as `albums()`.

```js
albums = db.albums().filter({ genre: 'Jazz' })
```

## Traversing relationships

Combined with the extensions to `artists.*` and `albums.*`, we can use it to
traverse back-and-forth along "models".

##### Chaining example

<!-- {.file-heading} -->

```js
db
  .artists()
  .find({ name: 'Taylor Swift' })
  .albums()
```

##### Another example

<!-- {.file-heading} -->

```js
albums.each((album) => {
  console.log(album.artist().get('name'))
})
```
