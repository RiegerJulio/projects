SELECT 
    so.name AS nome, COUNT(hi.song_id) AS reproducoes
FROM
    SpotifyClone.history AS hi
        INNER JOIN
    SpotifyClone.song AS so ON hi.song_id = so.song_id
        INNER JOIN
    SpotifyClone.user AS us ON us.user_id = hi.user_id
WHERE
    us.subscription_id IN (1 , 4)
GROUP BY nome
ORDER BY nome;