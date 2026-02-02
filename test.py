import pandas as pd
import matplotlib.pyplot as plt

# создаём данные
data = {
    "day": [1, 2, 3, 4, 5],
    "sales": [10, 15, 7, 20, 18]
}

df = pd.DataFrame(data)

# строим график
df.plot(x="day", y="sales")

# создаём данные
data = {
    "day": [1, 2, 3, 4, 5],
    "sales": [10, 15, 7, 20, 18]
}

df = pd.DataFrame(data)

# строим график
df.plot(x="day", y="sales")

plt.show()
