<?php
/**
    egret 全球排行 扩展 需要服务器环境支持 php sqlite
**/

    try {
        if(!isset($_REQUEST['Point'])){
            echo "参数错误";
        }else{
            $point = $_REQUEST['Point'];
            $cars=array(5, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0);
            //$result = $query->fetchAll();
            //$res['top'] = $result[0][0];
            echo json_encode($cars);
        }

    } catch (Exception $e) {
        echo "error!!:$e";
        exit;
    }
?>