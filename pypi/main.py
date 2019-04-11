from leaderboardweb import app as leaderboard_web_app
from leaderboarddata import app as leaderboard_data_app
import werkzeug.serving
import werkzeug.wrappers


def main():
    app = werkzeug.wsgi.DispatcherMiddleware(
        werkzeug.wrappers.Response("Nothing to see here!", status=404),
        mounts={"/leaderboard": leaderboard_web_app,
                "/leaderboard_data": leaderboard_data_app}
    )
    werkzeug.serving.run_simple(
        "127.0.0.1", 32387, app, use_reloader=True, use_debugger=True, threaded=True)


if __name__ == "__main__":
    main()
