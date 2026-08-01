#!/usr/bin/env python3
"""
Run the game locally with proper module/worker support.
- Optionally builds the bundle with Node (if available)
- Serves the repo over HTTP using Python's http.server (ThreadingHTTPServer)
- Opens the default web browser to the server URL

Usage:
  python run_game.py [--port PORT] [--no-build]

"""
import argparse
import http.server
import os
import socketserver
import subprocess
import sys
import threading
import webbrowser

from http.server import SimpleHTTPRequestHandler


def build_bundle():
    node = shutil_which('node')
    if not node:
        print('node not found in PATH; skipping bundle build')
        return 0
    print('Building bundle with node scripts/build-bundle.js...')
    try:
        subprocess.check_call([node, 'scripts/build-bundle.js'])
        print('Build completed')
        return 0
    except subprocess.CalledProcessError as e:
        print('Build failed:', e)
        return e.returncode


def shutil_which(cmd):
    # Lightweight cross-platform which
    paths = os.environ.get('PATH', '').split(os.pathsep)
    exts = ['']
    if os.name == 'nt':
        exts = os.environ.get('PATHEXT', '').split(os.pathsep)
    for p in paths:
        full = os.path.join(p, cmd)
        for ext in exts:
            candidate = full + ext
            if os.path.isfile(candidate) and os.access(candidate, os.X_OK):
                return candidate
    return None


def serve(port):
    Handler = SimpleHTTPRequestHandler
    try:
        # Python 3.7+: ThreadingHTTPServer available
        from http.server import ThreadingHTTPServer
        server = ThreadingHTTPServer(('0.0.0.0', port), Handler)
    except Exception:
        server = socketserver.TCPServer(('0.0.0.0', port), Handler)
    url = f'http://localhost:{port}/'
    print('Serving', os.getcwd(), 'at', url)
    print('Press Ctrl+C to stop')
    # Open browser in a short delay so server is ready
    threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down server...')
        server.shutdown()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', '-p', type=int, default=8000)
    parser.add_argument('--no-build', dest='build', action='store_false', help='Skip building bundle with Node')
    args = parser.parse_args()

    if args.build:
        # call build if node available
        import shutil
        if shutil.which('node'):
            try:
                subprocess.check_call(['node', 'scripts/build-bundle.js'])
            except subprocess.CalledProcessError as e:
                print('Build failed (continuing to serve):', e)
        else:
            print('Node not found; skipping bundle build')

    serve(args.port)
