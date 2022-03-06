import curses
from math import ceil
import requests as r

# import pafy
import time
import cv2
import numpy as np

# from vidgear.gears import CamGear

import api

FOOTER_HEIGHT=8
LPANE_WIDTH=30

user: str = None
selected_gang: int = 0

gangs = []
dms = []

video = False

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
    h, _ = w.getmaxyx()
    for i, it in enumerate(dms[-h+2:]):
        s = f"{it['sent_by']}: {it['content']}"
        w.addstr(i+1,1,s)


def char_map(g: int) -> str:
    grayRamp = '/|()1{}[]?-_+~<>i!lI;:,"^`\'. '
    # $@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft
    rampLength = len(grayRamp)
    return grayRamp[ceil((rampLength - 1) * (g / 255))]
 

def draw_main_panel(w):
    global video
    if user!=None:
        draw_dms(w)

    if video:
        # url = "https://www.youtube.com/watch?v=q6EoRBvdVPQ"
        cap = cv2.VideoCapture("videoplayback.mp4")
        # Check if camera opened successfully
        if (cap.isOpened()== False): 
            print("Error opening video  file")
        
        # Read until video is completed
        while(cap.isOpened()):
                
            # Capture frame-by-frame
            ret, frame = cap.read()
            if ret == True:
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                height, width = w.getmaxyx()
                dim = ((width-1), height)
                # resize image
                resized = cv2.resize(gray, dim, interpolation = cv2.INTER_CUBIC)
                # w.clear()
                for r, xs in enumerate(resized):
                    for c, x in enumerate(xs):
                        w.addstr(r,c,char_map(x))
                        w.refresh()
            
                # Display the resulting frame
                # cv2.imshow('Frame', frame)
            
                # Press Q on keyboard to  exit
                w.nodelay(True)
                if w.getch() == ord('q'):
                    video = False
                    reset_main(w)
                    w.refresh()
                    break
            
            # Break the loop
            else: 
                break
   
        # When everything done, release 
        # the video capture object
        cap.release()

   

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
        global video

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

        # vid start
        if cmd.startswith("vid"):
            video = True
            return 'Yee'
            
        
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



main()