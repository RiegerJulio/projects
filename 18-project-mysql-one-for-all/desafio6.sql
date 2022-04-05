SELECT 
    MIN(price) AS faturamento_minimo,
    MAX(price) AS faturamento_maximo,
    ROUND(AVG(price), 2) AS faturamento_medio,
    SUM(price) AS faturamento_total
FROM
    SpotifyClone.user AS us
        INNER JOIN
    SpotifyClone.subscriptions AS su ON su.subscription_id = us.subscription_id;