import subprocess

def executeCommand():
    subprocess.run(["npm", "run", "format"], shell=True)
    print("Waiting for nest build")
    subprocess.run(["npm", "run", "build"], shell=True)
    subprocess.run(["git", "fetch", "--prune", "origin"], shell=True)
    subprocess.run(["git", "pull"], shell=True)
    subprocess.run(["git", "add", "."], shell=True)
    subprocess.run(["git", "commit", "-m", "feat: implement or modified code"], shell=True)
    subprocess.run(["git", "push"], shell=True)
    subprocess.run(["git", "pull"], shell=True)
    # subprocess.run(["git", "push", "origin", "main:production"], shell=True)

executeCommand()
input("Press Enter to exit...")