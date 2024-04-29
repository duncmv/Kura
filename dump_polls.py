from models import Storage
from models.answers import Answer
from models.institutions import Institution
from models.polls import Poll
from models.questions import Question


institutions = Storage.all(Institution)
inst = institutions[5]

inst.polls.extend([
    Poll(
        title="Employees satisfaction",
        description="This poll is to measure the satisfaction of the employees",
        questions=[
            Question(
                text="How satisfied are you with the work environment?",
                answers=[
                    Answer(text="Very satisfied"),
                    Answer(text="Satisfied"),
                    Answer(text="Neutral"),
                    Answer(text="Dissatisfied"),
                    Answer(text="Very dissatisfied")
                ]
            ),
            Question(
                text="How satisfied are you with the management?",
                answers=[
                    Answer(text="Very satisfied"),
                    Answer(text="Satisfied"),
                    Answer(text="Neutral"),
                    Answer(text="Dissatisfied"),
                    Answer(text="Very dissatisfied")
                ]
            ),
            Question(
                text="How satisfied are you with the salary?",
                answers=[
                    Answer(text="Very satisfied"),
                    Answer(text="Satisfied"),
                    Answer(text="Neutral"),
                    Answer(text="Dissatisfied"),
                    Answer(text="Very dissatisfied")
                ]
            )
        ]
    ),
    Poll(
        title="Employees survey",
        description="Collecting employees data",
        questions=[
            Question(
                text="What is your job role?",
                answers=[
                    Answer(text="Software Engineer"),
                    Answer(text="QA Engineer"),
                    Answer(text="DevOps Engineer"),
                    Answer(text="Data Scientist"),
                    Answer(text="Product Manager")
                ]
            ),
            Question(
                text="What is your educational speciality?",
                answers=[
                    Answer(text="Computer Science"),
                    Answer(text="Software Engineering"),
                    Answer(text="Information Technology"),
                    Answer(text="Data Science"),
                    Answer(text="Product Management")
                ]
            ),
            Question(
                text="What is your salary range?",
                answers=[
                    Answer(text="Less than 1000"),
                    Answer(text="1000 - 2000"),
                    Answer(text="2000 - 3000"),
                    Answer(text="3000 - 4000"),
                    Answer(text="More than 4000")
                ]
            )
        ]
    )
])

Storage.save()