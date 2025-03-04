#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from aigents.crew import Aigents

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

def run():
    """
    Run the crew.
    """
    inputs = {
        'topic': 'my self gopi and im currently studying 12th grade. i have an interest in dancing and i want to become a professional dancer. i want to know the best colleges in india for dance and the courses they offer. i also want to know the career opportunities in dance and the salary of a professional dancer. can you help me with this?',
        'current_year': str(datetime.now().year)
    }
    
    try:
        Aigents().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")


def train():
    """
    Train the crew for a given number of iterations on relevant topics.
    """
    inputs = {
        "topic": sys.argv[3] if len(sys.argv) > 3 else "Career Guidance for Students"
    }
    try:
        Aigents().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")

def replay():
    """
    Replay the crew execution from a specific task, with optional topic selection.
    """
    inputs = {
        "topic": sys.argv[2] if len(sys.argv) > 2 else "Career and College Selection"
    }
    try:
        Aigents().crew().replay(task_id=sys.argv[1], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")

def test():
    """
    Test the crew execution with Gemini or local models.
    """
    inputs = {
        "topic": sys.argv[3] if len(sys.argv) > 3 else "Best Engineering Colleges for AI/Software"
    }
    try:
        Aigents().crew().test(n_iterations=int(sys.argv[1]), model_name=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")
