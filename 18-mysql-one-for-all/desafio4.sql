SELECT 
    us.user_name AS usuario,
    IF(MAX(hi.date_listened) LIKE '2021%',
        'Usuário ativo',
        'Usuário inativo') AS condicao_usuario
FROM
    user AS us
        INNER JOIN
    history AS hi ON hi.user_id = us.user_id
GROUP BY user_name
ORDER BY user_name;