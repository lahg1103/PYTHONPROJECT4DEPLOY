import math
import random

class unit():
    def __init__(self, name, image, lvl, isBoss=False, index=0):
        self.name = name
        self.image = image
        self.max_hp = random.randint(20, 30) 
        if (self.name == "Carlos"):
            self.max_hp += random.randint(10, 20)
        self.hp = self.max_hp
        self.str = random.randint(15, 20)
        self.defense = random.randint(10,15)
        self.money = 150
        self.isBoss = isBoss
        if (self.isBoss):
            self.max_hp += 5
            self.str += 5
            self.defense +=5
            self.hp = self.max_hp
        self.lvl = lvl
        self.isAlive = True
        self.stats = {"name": self.name, "hp": self.hp, "str": self.str, "defense": self.defense, "money": self.money}
        self.index = index
        
    def attack(self, target):
        
        atkpwr = self.str - int(target.defense * 0.5)
        if self.name == 'Carlos' :
            atkpwr = int(atkpwr * 1.4) + 4
        target.hp -= atkpwr
        if target.hp <= 0:
            combatDict = {self.name: self.hp, target.name: target.hp, "message": "you win"}
            target.isAlive = False
        elif self.hp <= 0:
            combatDict = {self.name: self.hp, target.name: target.hp, "message": "you lose"}
            self.isAlive = False
        else:
            combatDict = {self.name: self.hp, target.name: target.hp, "message": "combat"}
        self.stats = {"name": self.name, "hp": self.hp, "str": self.str, "defense": self.defense, "money": self.money}
        target.stats = {"name": target.name, "hp": target.hp, "str": target.str, "defense": target.defense, "money": target.money}
        return combatDict
    def heal(self, target):
        if (self.hp == self.max_hp):
            pass
        else:
            self.hp += random.randint(2, int(self.max_hp * 0.5))
            if self.hp > self.max_hp:
                self.hp = self.max_hp
            self.stats = {"name": self.name, "hp": self.hp, "str": self.str, "defense": self.defense, "money": self.money}
        combatDict = {self.name: self.hp, target.name: target.hp, "message": "combat"}
        return combatDict