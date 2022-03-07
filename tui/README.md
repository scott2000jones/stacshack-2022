# frontend terminal UI
written with curses

## CLI language spec:

#### not logged in:
`login` username pass
> true,false

`register` username
> Ok! then log in

#### logged in:
display gangs pane

`logout`
> not implemented, instead exit or login as someone else

`mkdir` gang_name

> create a new gang

`cd` gang_index

> select active gang

`join` gang_name

> join a gang

`call`
> not implemented

`write` words

> write a message to the gang

`vid*`

> watch a vid (with the gang coming soon)

