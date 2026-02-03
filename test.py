import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt


# Используем максимально стабильный тикер для евро
ticker_symbol = "EUR=X" 
usd_eur = yf.Ticker(ticker_symbol)

data = usd_eur.history(period="1y", interval="1d")

if not data.empty:
    # Выводим первые несколько строк данных для проверки
    print(data.head())

    # Строим график изменения курса евро к доллару за последний месяц
    plt.figure(figsize=(12, 6))
    plt.plot(data.index, data['Close'],marker = 'o',linestyle = '-', label='USD/EUR', color='green')

    plt.xticks(rotation=45)

    plt.xticks(data.index[::1])
    plt.title('Курс доллара к евро за последний год')
    plt.xlabel('Дата')
    plt.ylabel('Курс USD/EUR')
    plt.legend()
    plt.grid()
    plt.show()
else:
    print("Нет данных для отображения.")