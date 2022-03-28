SELECT 
    us.user_name AS usuario,
    COUNT(hi.user_id) AS qtde_musicas_ouvidas,
    ROUND(SUM(so.song_seconds) / 60, 2) AS total_minutos
FROM
    SpotifyClone.user AS us
        INNER JOIN
    SpotifyClone.history AS hi ON us.user_id = hi.user_id
        INNER JOIN
    SpotifyClone.song AS so ON so.song_id = hi.song_id
GROUP BY user_name
ORDER BY user_name;