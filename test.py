import json
import random
from models import Storage
from models.answers import Answer
from models.countries import Country
from models.districts import District
from models.institutions import Institution
from models.legal_entity import LegalEntity
from models.polls import Poll
from models.questions import Question
from models.users import User
from models.choices import Choice
from models.industries import Industry
from models.regions import Region
from models.tags import Tag

answers = Storage.all(Answer)
for answer in answers:
    print(len(answer.choices))
# questions = Storage.all(Question)
# for question in questions:
#     user.choices.append(Choice(answer=question.answers[random.randint(0,4)]))
# Storage.save()
# choice = [choice for choice in user.choices][0]
# print(choice.answer.text)
# user.choices.remove(choice)
# Storage.delete(choice)
# Storage.save()

# poll = Storage.all(Poll)[0]
# # user.taged_polls.append(poll)
# user.taged_polls.remove(poll)
# Storage.save()

# print(user.taged_polls[0].to_dict())

# Storage.delete(user)
# Storage.save()