import curses
import requests as r

# import pafy
# import cv2

import api

FOOTER_HEIGHT=8
LPANE_WIDTH=30


user: str = None
selected_gang: int = 0

gangs = []
dms = []

# video = False

commands = []

def main():

    """
    The curses.wrapper function is an optional function that
    encapsulates a number of lower-level setup and teardown
    functions, and takes a single function to run when
    the initializations have taken place.
    """

    curses.wrapper(curses_main)

def logged_in(): return user!=None

def draw_gangs(w):
    if not logged_in(): return
    w.addstr(0, LPANE_WIDTH//2-5, "Your gangs", curses.A_BOLD)
    
    for i, it in enumerate(gangs):
        s = f"{i}: {it}"
        style = curses.A_BOLD if i==selected_gang else curses.A_NORMAL
        w.addstr(i+1,1,s, style)

def draw_dms(w):
    # if not logged_in(): return

    w.addstr(0, LPANE_WIDTH//2-5, "Messages", curses.A_BOLD)
    
    for i, it in enumerate(dms):
        s = f"{i}: {it}"
        # style = curses.A_BOLD if i==selected_gang else curses.A_NORMAL
        w.addstr(i+1,1,s)


def draw_main_panel(w):
    if user!=None:
        draw_dms(w)

    # if video:
    #     url = "https://www.youtube.com/watch?v=_9OBhtLA9Ig"
    #     video = pafy.new(url)
    #     best = video.getbest(preftype="mp4")

    #     capture = cv2.VideoCapture(best.url)
    #     while True:
    #         grabbed, frame = capture.read()
    #         # ...


def reset_main(w):
        w.clear()
        w.box()
        w.refresh()

def reset_footer(w):
        w.clear()
        w.box()
        w.addch(1,1,">")
        w.move(1,3)
        w.refresh()


def curses_main(w):

    w.border(0)
    
    left_pane = w.subwin(curses.LINES-FOOTER_HEIGHT, LPANE_WIDTH,1, 1)
    left_pane.box()

    # draw list of available gangs
    draw_gangs(left_pane)

    main_pane = w.subwin(curses.LINES-FOOTER_HEIGHT, curses.COLS-LPANE_WIDTH-2, 1, LPANE_WIDTH+1)

    reset_main(main_pane)

    footer_pane = w.subwin(FOOTER_HEIGHT-2, curses.COLS-2, curses.LINES-FOOTER_HEIGHT+1, 1)
    reset_footer(footer_pane)


    def do_cmd(cmd: str):
        global user
        global gangs
        global selected_gang
        global dms

        # refresh
        if cmd.startswith("poll"):
            gangs = api.get_user_gangs(user)
            if gangs:
                dms = api.get_gang_dms(gangs[selected_gang])
            return True

        # login
        if cmd.startswith("login "):
            arr = cmd.split(" ")
            success = api.login(arr[1], arr[2])
            # store current user
            if success:
                user = arr[1]
                gangs = api.get_user_gangs(user)
                if gangs:
                    dms = api.get_gang_dms(gangs[selected_gang])
            # TODO: print login prompt
            return success
        
        
        # register
        if cmd.startswith("register "):
            arr = cmd.split(" ")
            return api.register(arr[1], arr[2])

        # team select
        if cmd.startswith("cd "):
            if not logged_in(): return
            # set selected gang and update dms list
            selected_gang = min((len(gangs)-1, int(cmd.split(" ")[1])))
            if gangs:
                dms = api.get_gang_dms(gangs[selected_gang])
            reset_main(main_pane)
            return True

        # team create
        if cmd.startswith("mkdir "):
            if not logged_in(): return
            name = cmd.split(" ")[1]
            success = api.create_gang(name)
            return success

        # team write
        if cmd.startswith("write "):
            if not logged_in(): return
            text = cmd[6:]
            if not gangs: return "first join a gang!"
            # else send req
            success = api.gang_write(gangs[selected_gang],user,text)
            dms = api.get_gang_dms(gangs[selected_gang])
            return success
        

        # team join
        if cmd.startswith("join "):
            if not logged_in(): return
            # get gang id
            gang = cmd.split(" ")[1]
            success = api.gang_add_user(gang,user)
            if success:
                gangs = api.get_user_gangs(user)
                # selected_gang = gangs.index(gang)
            # update gangs list
            return success
        
        return cmd

    w.addstr(0, curses.COLS//2-4, "MS Gangs", curses.A_BOLD)
    w.refresh()
    w.nodelay(True)
    curses.echo()

    # repl
    while True:
        curses.noecho()
        curses.curs_set(0)
        draw_main_panel(main_pane)
        main_pane.refresh()

        # enter input mode
        key = w.getch()
        if key == ord('i'):
            curses.curs_set(1)
            curses.echo()
            # reset footer
            reset_footer(footer_pane)
        
            # await input
            cmd = footer_pane.getstr()
            # parse and act on the cmd
            result = do_cmd(cmd.decode('utf-8'))
            # err
            if not result:
                footer_pane.addstr(4, 1, str(result), curses.A_BOLD)
                footer_pane.refresh()
                continue
            # else success!

            footer_pane.addstr(4, 1, str(result), curses.A_BOLD)
            footer_pane.refresh()

            commands.append(cmd)

            draw_gangs(left_pane)
            left_pane.refresh()

        w.refresh()


    """
    This function is called curses_main to emphasise that it is
    the logical if not actual main function, called by curses.wrapper.
    Its purpose is to call several other functions to demonstrate
    some of the functionality of curses.
    """

    w.addstr("-----------------\n")
    w.addstr("| codedrome.com |\n")
    w.addstr("| curses demo   |\n")
    w.addstr("-----------------\n")
    w.refresh()

    printing(w)

    moving_and_sleeping(w)

    colouring(w)

    w.addstr("\npress any key to exit...")
    w.refresh()
    w.getch()


def printing(w):

    """
    A few simple demonstrations of printing.
    """

    w.addstr("This was printed using addstr\n\n")
    w.refresh()

    w.addstr("The following letter was printed using addch:- ")
    w.addch('a')
    w.refresh()

    w.addstr("\n\nThese numbers were printed using addstr:-\n{}\n{:.6f}\n".format(123, 456.789))
    w.refresh()


def moving_and_sleeping(w):

    """
    Demonstrates moving the cursor to a specified position before printing,
    and sleeping for a specified period of time.
    These are useful for very basic animations.
    """

    row = 5
    col = 0

    curses.curs_set(False)

    for c in range(65, 91):

        w.addstr(row, col, chr(c))
        w.refresh()
        row += 1
        col += 1
        curses.napms(100)

    curses.curs_set(True)

    w.addch('\n')


def colouring(w):

    """
    Demonstration of setting background and foreground colours.
    """

    if curses.has_colors():

        curses.init_pair(1, curses.COLOR_YELLOW, curses.COLOR_RED)
        curses.init_pair(2, curses.COLOR_GREEN, curses.COLOR_GREEN)
        curses.init_pair(3, curses.COLOR_MAGENTA, curses.COLOR_CYAN)

        w.addstr("Yellow on red\n\n", curses.color_pair(1))
        w.refresh()

        w.addstr("Green on green + bold\n\n", curses.color_pair(2) | curses.A_BOLD)
        w.refresh()

        w.addstr("Magenta on cyan\n", curses.color_pair(3))
        w.refresh()

    else:

        w.addstr("has_colors() = False\n");
        w.refresh()


main()