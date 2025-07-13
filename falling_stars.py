import pygame
import random
import math

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Natural Colored Meteor & Space Rocks")

clock = pygame.time.Clock()
BLACK = (0, 0, 0)

# Warna meteor natural (putih ke oranye ke merah)
METEOR_COLORS = [
    (255, 255, 255),  # putih terang
    (255, 220, 180),  # krem / oranye pucat
    (255, 165, 79),   # oranye terang
    (255, 100, 50),   # oranye kemerahan
    (255, 50, 50),    # merah lembut
]

# Warna batu di luar angkasa (bervariasi abu dan kuning pucat)
ROCK_COLORS = [
    (200, 200, 200),
    (255, 255, 220),
    (180, 180, 180),
    (220, 220, 200),
    (230, 230, 210),
]

class Rock:
    def __init__(self):
        self.x = random.randint(0, WIDTH)
        self.y = random.randint(0, HEIGHT)
        self.radius = random.randint(1, 3)
        self.color = random.choice(ROCK_COLORS)
        self.alpha = random.randint(50, 150)

    def draw(self, surface):
        s = pygame.Surface((self.radius*2, self.radius*2), pygame.SRCALPHA)
        r, g, b = self.color
        pygame.draw.circle(s, (r, g, b, self.alpha), (self.radius, self.radius), self.radius)
        surface.blit(s, (self.x, self.y))

class Meteor:
    def __init__(self):
        self.reset()

    def reset(self):
        self.x = random.randint(0, WIDTH)
        self.y = random.randint(-HEIGHT*2, 0)
        self.length = random.randint(150, 300)
        self.speed = random.uniform(10, 20)
        self.angle = math.radians(random.randint(25, 40))
        self.alpha = 255
        self.tail_points = []
        self.color = random.choice(METEOR_COLORS)  # pilih warna meteor

    def update(self):
        self.x += self.speed * math.cos(self.angle)
        self.y += self.speed * math.sin(self.angle)
        self.alpha -= 4
        self.tail_points.append((self.x, self.y))
        if len(self.tail_points) > 30:
            self.tail_points.pop(0)
        if self.alpha <= 0 or self.x > WIDTH or self.y > HEIGHT:
            self.reset()

    def draw(self, surface):
        r, g, b = self.color
        for i, (tx, ty) in enumerate(self.tail_points):
            alpha = max(0, int(self.alpha - (i * (self.alpha / len(self.tail_points)))))
            s = pygame.Surface((4, 4), pygame.SRCALPHA)
            pygame.draw.circle(s, (r, g, b, alpha), (2, 2), 2)
            surface.blit(s, (tx, ty))

        head_alpha = max(0, self.alpha)
        s = pygame.Surface((6, 6), pygame.SRCALPHA)
        pygame.draw.circle(s, (r, g, b, head_alpha), (3, 3), 3)
        surface.blit(s, (self.x, self.y))

def main():
    rocks = [Rock() for _ in range(60)]
    meteors = [Meteor() for _ in range(8)]
    running = True

    while running:
        screen.fill(BLACK)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        for rock in rocks:
            rock.draw(screen)

        for meteor in meteors:
            meteor.update()
            meteor.draw(screen)

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()
