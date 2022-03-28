SELECT 
    so.name AS cancao, COUNT(hi.song_id) AS reproducoes
FROM
    song AS so
        INNER JOIN
    history AS hi ON so.song_id = hi.song_id
GROUP BY name
ORDER BY reproducoes DESC , cancao
LIMIT 2;